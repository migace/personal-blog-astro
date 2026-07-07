import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

const CONTACT_TO = "michal.gacek@tiptopdesign.pl";
const CONTACT_FROM = "Tiptopdesign contact <noreply@tiptopdesign.pl>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_FIELD_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;

// Best-effort per-IP rate limit. The Map lives only as long as the warm
// serverless instance, so this is a nuisance filter, not a hard guarantee -
// good enough for a contact form whose real cost is Resend quota.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const recentRequests = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const timestamps = (recentRequests.get(ip) ?? []).filter((t) => t > windowStart);
  if (timestamps.length >= RATE_LIMIT_MAX) {
    recentRequests.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  recentRequests.set(ip, timestamps);
  if (recentRequests.size > 1000) {
    // Drop stale entries so a scripted flood can't grow the map unbounded.
    for (const [key, values] of recentRequests) {
      if (values.every((t) => t <= windowStart)) recentRequests.delete(key);
    }
  }
  return false;
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export const POST: APIRoute = async ({ request, clientAddress, url }) => {
  // Reject cross-site POSTs. Browsers always attach Origin to cross-origin
  // fetch; requests without the header (curl etc.) fall through to the rate
  // limit and honeypot below.
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== url.host) {
    return json({ ok: false, error: "Invalid request origin." }, 403);
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    clientAddress ||
    "unknown";
  if (isRateLimited(ip)) {
    return json(
      { ok: false, error: "Too many messages. Please try again later." },
      429,
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request body." }, 400);
  }

  const name = String(payload.name ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const subject = String(payload.subject ?? "").trim();
  const message = String(payload.message ?? "").trim();
  // Honeypot field: real users leave it empty.
  const contact_extra = String(payload.contact_extra ?? "").trim();

  if (contact_extra) {
    return json({ ok: true });
  }

  if (!name || !email || !message) {
    return json(
      { ok: false, error: "Please fill in your name, email, and message." },
      400,
    );
  }

  if (!EMAIL_RE.test(email)) {
    return json(
      { ok: false, error: "Please enter a valid email address." },
      400,
    );
  }

  if (
    name.length > MAX_FIELD_LENGTH ||
    email.length > MAX_FIELD_LENGTH ||
    subject.length > MAX_FIELD_LENGTH ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    return json({ ok: false, error: "The message is too long." }, 400);
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    return json(
      {
        ok: false,
        error:
          "Email sending is not configured yet. Please email michal.gacek@tiptopdesign.pl directly.",
      },
      503,
    );
  }

  const resend = new Resend(apiKey);
  const finalSubject = subject || `New message from ${name}`;

  try {
    const { error } = await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: email,
      subject: `[tiptopdesign.pl] ${finalSubject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${finalSubject}\n\n${message}`,
    });

    if (error) {
      return json(
        {
          ok: false,
          error:
            "Could not send the message. Please try again or email directly.",
        },
        502,
      );
    }

    return json({ ok: true });
  } catch {
    return json(
      {
        ok: false,
        error:
          "Could not send the message. Please try again or email directly.",
      },
      502,
    );
  }
};

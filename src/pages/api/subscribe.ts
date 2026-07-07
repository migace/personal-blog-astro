import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LENGTH = 200;

// Same best-effort per-IP rate limit as the contact endpoint: the Map lives
// only as long as the warm serverless instance, which is enough to blunt
// scripted signups without any storage.
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
      { ok: false, error: "Too many requests. Please try again later." },
      429,
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request body." }, 400);
  }

  const email = String(payload.email ?? "").trim();
  // Honeypot field: real users leave it empty.
  const newsletter_extra = String(payload.newsletter_extra ?? "").trim();

  if (newsletter_extra) {
    return json({ ok: true });
  }

  if (!email || !EMAIL_RE.test(email) || email.length > MAX_FIELD_LENGTH) {
    return json({ ok: false, error: "Please enter a valid email address." }, 400);
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  const audienceId = import.meta.env.RESEND_AUDIENCE_ID;
  if (!apiKey || !audienceId) {
    return json(
      {
        ok: false,
        error:
          "Signups are not open yet. Please email michal.gacek@tiptopdesign.pl to be added manually.",
      },
      503,
    );
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.contacts.create({
      email,
      audienceId,
      unsubscribed: false,
    });

    if (error) {
      return json(
        { ok: false, error: "Could not sign you up. Please try again later." },
        502,
      );
    }

    return json({ ok: true });
  } catch {
    return json(
      { ok: false, error: "Could not sign you up. Please try again later." },
      502,
    );
  }
};

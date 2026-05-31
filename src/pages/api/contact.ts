import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

const CONTACT_TO = "michal.gacek@tiptopdesign.pl";
const CONTACT_FROM = "Tiptopdesign contact <noreply@tiptopdesign.pl>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export const POST: APIRoute = async ({ request }) => {
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

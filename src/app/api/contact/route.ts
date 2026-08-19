import { z } from "zod";
import { sendEmail } from "@/lib/email";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  const body = await request.json();
  const result = contactFormSchema.safeParse(body);

  if (!result.success) {
    return Response.json({ error: "Validation failed", issues: result.error.issues }, { status: 400 });
  }

  const { name, email, message } = result.data;

  const htmlContent = `
    <h1>New Contact Request</h1>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Message:</strong> ${escapeHtml(message)}</p>
  `;

  const emails = process.env.CONTACT_USERS?.split(",") ?? [];
  const from = process.env.MAIL_USERNAME ?? "";

  try {
    await sendEmail(emails, from, "KOOKED.ch - Contact", htmlContent);
    return Response.json({ message: "Email sent" });
  } catch {
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }
}

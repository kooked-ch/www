import nodemailer, { type SendMailOptions, type Transporter } from "nodemailer";

export async function sendEmail(emails: string[], from: string, subject: string, htmlContent: string): Promise<void> {
  const transporter: Transporter = nodemailer.createTransport({
    host: "mail.infomaniak.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USERNAME || "",
      pass: process.env.MAIL_PASSWORD || "",
    },
  });

  const mailOptions: SendMailOptions = {
    from,
    to: emails,
    subject,
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
}

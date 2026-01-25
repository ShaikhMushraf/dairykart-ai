import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendResetEmail(email: string, resetLink: string) {
  await transporter.sendMail({
    from: `"DairyKart" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Reset your DairyKart password",
    html: `
      <p>You requested a password reset.</p>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link is valid for 15 minutes.</p>
    `,
  });
}

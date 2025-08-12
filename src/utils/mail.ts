import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.example.com",
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: false, // use TLS
  auth: {
    user: process.env.EMAIL_USER || "user@example.com",
    pass: process.env.EMAIL_PASS || "password",
  },
});

export async function sendEmailForVerficationToken(
  email: string,
  token: string
): Promise<void> {
  const verificationUrl = `/confirm-email/${token}`; // Update to your actual URL

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || "no-reply@example.com",
      to: email,
      subject: "verified email",
      text: "Please confirm your email",
      html: `Please click on the following link to verify your emaildsDFASDF: <a href="${verificationUrl}">${verificationUrl}</a>`, // Optional HTML content
    });

    console.log(`Email sent to ${email} with subject: CONFIRM_EMAIL`);
  } catch (error) {
    console.log(`Failed to send email to ${email}:`, error);
    throw new Error("Email sending failed");
  }
}

export async function sendEmail(
  email: string,
  subject: string,
  message: string
) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM || "no-reply@example.com",
    to: email,
    subject,
    text: message,
    html: `<p>${message}</p>`,
  });
}

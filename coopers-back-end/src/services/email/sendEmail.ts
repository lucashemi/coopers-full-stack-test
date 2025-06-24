import nodemailer from "nodemailer";
import { Contact } from "../../models/Contact";

export async function sendEmail({ name, email, telephone, message }: Contact) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS, // app password
    },
  });

  const mailOptions = {
    from: `"${name}" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Formulário de Contato Coopers",
    html: `
      <h2>New message received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Telephone:</strong> ${telephone}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("E-mail sent:", info.response);
  } catch (err) {
    console.error("Error sending e-mail:", err);
    throw new Error("Error sending e-mail");
  }
}

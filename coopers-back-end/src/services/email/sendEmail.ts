import nodemailer from "nodemailer";
import { Contact } from "../../models/Contact";
import { loadAndFillTemplate } from "../../utils/emailUtils";

export async function sendEmail({ name, email, telephone, message }: Contact) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS, // app password
    },
  });

  const html = loadAndFillTemplate("contact.html", {
    name,
    email,
    telephone,
    message,
  });

  const mailOptions = {
    from: `"${name}" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Formulário de Contato Coopers",
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("E-mail sent:", info.response);
  } catch (err) {
    console.error("Error sending e-mail:", err);
    throw new Error("Error sending e-mail");
  }
}

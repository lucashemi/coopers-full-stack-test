import { Request, Response } from "express";
import knex from "../config/knexfile";
import { sendEmail } from "../services/email/sendEmail";

export const sendEmailController = async (req: Request, res: Response) => {
  try {
    const name = req.body.name ?? "Anonymous";
    const { email, telephone, message } = req.body;

    if (!email || !telephone || !message) {
      res.status(400).json({ error: "Fill all the necessary fields." });
      return;
    }

    // Saving on the database
    await knex("contacts").insert({
      name,
      email,
      telephone,
      message,
    });

    // Sending email
    await sendEmail({ name, email, telephone, message });

    res
      .status(200)
      .json({ success: true, message: "Message sent and saved with success." });
    return;
  } catch (err) {
    console.error("Error saving/sending:", err);
    res.status(500).json({ success: false, message: "Internal error." });
    return;
  }
};

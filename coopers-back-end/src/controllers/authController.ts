import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import knex from "../config/knexfile";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      res.status(400).json({ message: "Name and password are required" });
      return;
    }

    // Verify if user already exists
    const existingUser = await knex("users").where({ name }).first();
    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const [userId] = await knex("users").insert({
      name,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: userId, name }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 1,
    });

    res.status(201).json({ message: "User registered successfully" });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      res.status(400).json({ message: "Name and password are required" });
      return;
    }

    // Verify if user exists
    const user = await knex("users").where({ name }).first();
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    // Verify if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: user.id, name }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 1,
    });
    res.json({ message: "Login successful" });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const logout = (_req: Request, res: Response) => {
  try {
    // Clear cookie and send response
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 1,
    });
    res.json({ message: "Logout successful" });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const me = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    res.json({ id: user?.id, name: user?.name });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

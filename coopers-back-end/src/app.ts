import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";
import emailRouters from "./routes/emailRoutes";
import dotenv from "dotenv";

dotenv.config();

export const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api", taskRoutes);
app.use("/email", emailRouters);

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";
import emailRouters from "./routes/emailRoutes";

export const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api", taskRoutes);
app.use("/email", emailRouters);

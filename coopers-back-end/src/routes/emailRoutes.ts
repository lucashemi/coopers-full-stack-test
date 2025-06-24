import { Router } from "express";
import { sendEmailController } from "../controllers/emailController";

const router = Router();

router.post("/contact", sendEmailController);

export default router;

import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === "test") {
    (req as any).user = { id: 1 };
    next();
    return;
  }
  const token = req.cookies.token;

  // Verify if token exists
  if (!token) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  // Verify token and get user
  jwt.verify(
    token,
    process.env.JWT_SECRET!,
    (err: VerifyErrors | null, decoded?: any | undefined) => {
      if (err) return res.status(401).json({ message: "Not authenticated" });

      req.user = decoded;
      next();
    }
  );
};

export default authMiddleware;

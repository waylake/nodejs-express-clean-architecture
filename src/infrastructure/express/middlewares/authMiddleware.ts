import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../../auth/jwt";
import { CustomError } from "../../../domain/errors/CustomError";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return next(new CustomError("No token provided", 401));
  }

  try {
    const decoded = verifyAccessToken(token);
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    next(new CustomError("Invalid token", 403));
  }
};

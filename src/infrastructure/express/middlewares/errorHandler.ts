import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../../domain/errors/CustomError";
import logger from "../../logging/logger";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error(err);

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  // 개발 환경에서는 스택 트레이스를 포함
  if (process.env.NODE_ENV === "development") {
    return res.status(500).json({
      error: "Internal server error",
      stack: err.stack,
    });
  }

  // 프로덕션 환경에서는 일반적인 에러 메시지만 반환
  res.status(500).json({ error: "Internal server error" });
};

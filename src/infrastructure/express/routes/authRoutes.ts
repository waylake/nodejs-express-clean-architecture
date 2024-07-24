import { Router, Request, Response, NextFunction } from "express";
import { container } from "../../config/inversify.config";
import { AuthController } from "../../../interfaces/controllers/AuthController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const authController = container.get<AuthController>(AuthController);

router.post("/register", (req: Request, res: Response, next: NextFunction) =>
  authController.register(req, res, next),
);
router.post("/login", (req: Request, res: Response, next: NextFunction) =>
  authController.login(req, res, next),
);
router.post(
  "/refresh-token",
  (req: Request, res: Response, next: NextFunction) =>
    authController.refreshToken(req, res, next),
);
router.post(
  "/logout",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    authController.logout(req, res, next),
);

export default router;

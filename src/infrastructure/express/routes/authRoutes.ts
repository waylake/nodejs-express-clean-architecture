import { Router } from "express";
import { container } from "../../config/inversify.config";
import { AuthController } from "../../../interfaces/controllers/AuthController";

const router = Router();
const authController = container.get<AuthController>(AuthController);

router.post("/login", (req, res) => authController.login(req, res));

export default router;

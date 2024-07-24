import { injectable, inject } from "inversify";
import { Request, Response } from "express";
import { LoginUseCase } from "../../domain/usecases/LoginUseCase";
import { LoginRequestDTO } from "../../domain/usecases/dto/LoginDTO";
import { LoginPresenter } from "../presenters/LoginPresenter";

@injectable()
export class AuthController {
  constructor(
    @inject(LoginUseCase) private loginUseCase: LoginUseCase,
    @inject(LoginPresenter) private loginPresenter: LoginPresenter,
  ) {}

  async login(req: Request, res: Response): Promise<void> {
    try {
      const loginRequest: LoginRequestDTO = {
        username: req.body.username,
        password: req.body.password,
      };
      const result = await this.loginUseCase.execute(loginRequest);
      const presentableResult = this.loginPresenter.present(result);
      res.json(presentableResult);
    } catch (error) {
      res.status(401).json({ error: "Invalid credentials" });
    }
  }
}

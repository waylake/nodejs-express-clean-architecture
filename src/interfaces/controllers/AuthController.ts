import { injectable, inject } from "inversify";
import { Request, Response, NextFunction } from "express";
import { RegisterUseCase } from "../../domain/usecases/RegisterUseCase";
import { LoginUseCase } from "../../domain/usecases/LoginUseCase";
import { RefreshTokenUseCase } from "../../domain/usecases/RefreshTokenUseCase";
import { LogoutUseCase } from "../../domain/usecases/LogoutUseCase";
import { RegisterPresenter } from "../presenters/RegisterPresenter";
import { LoginPresenter } from "../presenters/LoginPresenter";
import { RefreshTokenPresenter } from "../presenters/RefreshTokenPresenter";
import { LogoutPresenter } from "../presenters/LogoutPresenter";
import { ErrorPresenter } from "../presenters/ErrorPresenter";
import { CustomError } from "../../domain/errors/CustomError";

@injectable()
export class AuthController {
  constructor(
    @inject(RegisterUseCase) private registerUseCase: RegisterUseCase,
    @inject(LoginUseCase) private loginUseCase: LoginUseCase,
    @inject(RefreshTokenUseCase)
    private refreshTokenUseCase: RefreshTokenUseCase,
    @inject(LogoutUseCase) private logoutUseCase: LogoutUseCase,
    @inject(RegisterPresenter) private registerPresenter: RegisterPresenter,
    @inject(LoginPresenter) private loginPresenter: LoginPresenter,
    @inject(RefreshTokenPresenter)
    private refreshTokenPresenter: RefreshTokenPresenter,
    @inject(LogoutPresenter) private logoutPresenter: LogoutPresenter,
    @inject(ErrorPresenter) private errorPresenter: ErrorPresenter,
  ) {}

  async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { username, password } = req.body;
      const user = await this.registerUseCase.execute(username, password);
      if (!user.id) {
        throw new CustomError("User ID is undefined", 500);
      }
      const presentedData = this.registerPresenter.present(
        user.id,
        user.username,
      );
      res.status(201).json(presentedData);
    } catch (error) {
      const presentedError = this.errorPresenter.present(
        error instanceof Error ? error : new Error("Unknown error"),
      );
      res.status(presentedError.statusCode).json(presentedError);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { username, password } = req.body;
      const result = await this.loginUseCase.execute(username, password);
      const presentedData = this.loginPresenter.present(
        result.accessToken,
        result.refreshToken,
        result.userId,
        username,
      );
      res.json(presentedData);
    } catch (error) {
      const presentedError = this.errorPresenter.present(
        error instanceof Error ? error : new Error("Unknown error"),
      );
      res.status(presentedError.statusCode).json(presentedError);
    }
  }

  async refreshToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { refreshToken } = req.body;
      const { accessToken } =
        await this.refreshTokenUseCase.execute(refreshToken);
      const presentedData = this.refreshTokenPresenter.present(accessToken);
      res.json(presentedData);
    } catch (error) {
      const presentedError = this.errorPresenter.present(
        error instanceof Error ? error : new Error("Unknown error"),
      );
      res.status(presentedError.statusCode).json(presentedError);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new CustomError("User ID not found", 401);
      }
      await this.logoutUseCase.execute(userId);
      const presentedData = this.logoutPresenter.present();
      res.json(presentedData);
    } catch (error) {
      const presentedError = this.errorPresenter.present(
        error instanceof Error ? error : new Error("Unknown error"),
      );
      res.status(presentedError.statusCode).json(presentedError);
    }
  }
}

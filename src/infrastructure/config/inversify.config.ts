import { Container } from "inversify";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { UserRepositoryImpl } from "../repositories/UserRepositoryImpl";
import { RegisterUseCase } from "../../domain/usecases/RegisterUseCase";
import { LoginUseCase } from "../../domain/usecases/LoginUseCase";
import { LogoutUseCase } from "../../domain/usecases/LogoutUseCase";
import { RefreshTokenUseCase } from "../../domain/usecases/RefreshTokenUseCase";
import { AuthController } from "../../interfaces/controllers/AuthController";

import { LoginPresenter } from "../../interfaces/presenters/LoginPresenter";
import { RegisterPresenter } from "../../interfaces/presenters/RegisterPresenter";
import { RefreshTokenPresenter } from "../../interfaces/presenters/RefreshTokenPresenter";
import { ErrorPresenter } from "../../interfaces/presenters/ErrorPresenter";
import { LogoutPresenter } from "../../interfaces/presenters/LogoutPresenter";

const container = new Container();

container.bind<IUserRepository>("UserRepository").to(UserRepositoryImpl);
container.bind(RegisterUseCase).toSelf();
container.bind(LoginUseCase).toSelf();
container.bind(RefreshTokenUseCase).toSelf();
container.bind(AuthController).toSelf();
container.bind(LogoutUseCase).toSelf();

container.bind(LoginPresenter).toSelf();
container.bind(RegisterPresenter).toSelf();
container.bind(RefreshTokenPresenter).toSelf();
container.bind(LogoutPresenter).toSelf();
container.bind(ErrorPresenter).toSelf();

export { container };

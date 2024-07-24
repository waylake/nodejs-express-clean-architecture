import { Container } from "inversify";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { UserRepositoryImpl } from "../repositories/UserRepositoryImpl";
import { LoginUseCase } from "../../domain/usecases/LoginUseCase";
import { AuthController } from "../../interfaces/controllers/AuthController";
import { LoginPresenter } from "../../interfaces/presenters/LoginPresenter";

const container = new Container();

container.bind<IUserRepository>("UserRepository").to(UserRepositoryImpl);
container.bind<LoginUseCase>(LoginUseCase).toSelf();
container.bind<LoginPresenter>(LoginPresenter).toSelf();
container.bind<AuthController>(AuthController).toSelf();

export { container };

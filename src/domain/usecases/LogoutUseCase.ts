import { injectable, inject } from "inversify";
import { IUserRepository } from "../interfaces/IUserRepository";

@injectable()
export class LogoutUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
  ) {}

  async execute(userId: string): Promise<void> {
    await this.userRepository.updateRefreshToken(userId, null);
  }
}

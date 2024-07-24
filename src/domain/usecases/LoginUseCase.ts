import { injectable, inject } from "inversify";
import { IUserRepository } from "../interfaces/IUserRepository";
import { LoginRequestDTO, LoginResponseDTO } from "./dto/LoginDTO";

@injectable()
export class LoginUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
  ) {}

  async execute(request: LoginRequestDTO): Promise<LoginResponseDTO> {
    const user = await this.userRepository.findByUsername(request.username);
    if (!user || user.password !== request.password) {
      throw new Error("Invalid credentials");
    }
    return { userId: user.id, username: user.username };
  }
}

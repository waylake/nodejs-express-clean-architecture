import { injectable, inject } from "inversify";
import { IUserRepository } from "../interfaces/IUserRepository";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../infrastructure/auth/jwt";
import { CustomError } from "../errors/CustomError";

@injectable()
export class LoginUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
  ) {}

  async execute(
    username: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string; userId: string }> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new CustomError("Invalid credentials", 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new CustomError("Invalid credentials", 401);
    }

    if (!user.id) {
      throw new CustomError("User ID is undefined", 500);
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    await this.userRepository.updateRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken, userId: user.id };
  }
}

import { injectable, inject } from "inversify";
import { IUserRepository } from "../interfaces/IUserRepository";
import {
  verifyRefreshToken,
  generateAccessToken,
} from "../../infrastructure/auth/jwt";
import { CustomError } from "../errors/CustomError";

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
  ) {}

  async execute(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const decoded = verifyRefreshToken(refreshToken);
      const user = await this.userRepository.findById(decoded.userId);

      if (!user || user.refreshToken !== refreshToken) {
        throw new CustomError("Invalid refresh token", 401);
      }

      if (!user.id) {
        throw new CustomError("User ID is undefined", 500);
      }

      const accessToken = generateAccessToken(user.id);
      return { accessToken };
    } catch (error) {
      throw new CustomError("Invalid refresh token", 401);
    }
  }
}

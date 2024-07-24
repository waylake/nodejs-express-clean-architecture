import { User } from "../entities/User";

export interface IUserRepository {
  findByUsername(username: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<User>;
  updateRefreshToken(
    userId: string,
    refreshToken: string | null,
  ): Promise<void>;
}

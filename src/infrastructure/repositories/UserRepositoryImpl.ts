import { injectable } from "inversify";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { User } from "../../domain/entities/User";

@injectable()
export class UserRepositoryImpl implements IUserRepository {
  private users: User[] = [];

  async findByUsername(username: string): Promise<User | null> {
    return this.users.find((user) => user.username === username) || null;
  }

  async save(user: User): Promise<User> {
    const existingUserIndex = this.users.findIndex((u) => u.id === user.id);
    if (existingUserIndex !== -1) {
      this.users[existingUserIndex] = user;
    } else {
      this.users.push(user);
    }
    return user;
  }
}

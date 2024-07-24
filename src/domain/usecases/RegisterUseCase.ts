import { injectable, inject } from "inversify";
import { IUserRepository } from "../interfaces/IUserRepository";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import { CustomError } from "../errors/CustomError";

@injectable()
export class RegisterUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
  ) {}

  async execute(username: string, password: string): Promise<User> {
    const existingUser = await this.userRepository.findByUsername(username);
    if (existingUser) {
      throw new CustomError("Username already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User(undefined, username, hashedPassword);
    return this.userRepository.save(newUser);
  }
}

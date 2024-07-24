import { injectable } from "inversify";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { User } from "../../domain/entities/User";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  refreshToken: { type: String },
});

const UserModel = mongoose.model("User", UserSchema);

@injectable()
export class UserRepositoryImpl implements IUserRepository {
  async findByUsername(username: string): Promise<User | null> {
    const user = await UserModel.findOne({ username });
    return user
      ? new User(
          user._id.toString(),
          user.username,
          user.password,
          user.refreshToken,
        )
      : null;
  }

  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findById(id);
    return user
      ? new User(
          user._id.toString(),
          user.username,
          user.password,
          user.refreshToken,
        )
      : null;
  }

  async save(user: User): Promise<User> {
    const newUser = new UserModel({
      username: user.username,
      password: user.password,
      refreshToken: user.refreshToken,
    });
    const savedUser = await newUser.save();
    return new User(
      savedUser._id.toString(),
      savedUser.username,
      savedUser.password,
      savedUser.refreshToken,
    );
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string | null,
  ): Promise<void> {
    await UserModel.findByIdAndUpdate(userId, { refreshToken });
  }
}

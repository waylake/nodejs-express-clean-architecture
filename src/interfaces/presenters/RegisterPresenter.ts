import { injectable } from "inversify";

interface RegisterResponse {
  message: string;
  user: {
    id: string;
    username: string;
  };
}

@injectable()
export class RegisterPresenter {
  present(userId: string, username: string): RegisterResponse {
    return {
      message: "User registered successfully",
      user: {
        id: userId,
        username,
      },
    };
  }
}

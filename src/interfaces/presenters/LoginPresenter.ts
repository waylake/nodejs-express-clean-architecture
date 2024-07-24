import { injectable } from "inversify";
import { LoginResponseDTO } from "../../domain/usecases/dto/LoginDTO";

export interface PresentableLoginResult {
  token: string;
  user: {
    id: string;
    username: string;
  };
}

@injectable()
export class LoginPresenter {
  present(loginResponse: LoginResponseDTO): PresentableLoginResult {
    // In a real application, you would generate a proper JWT token here
    const token = Buffer.from(
      `${loginResponse.userId}:${loginResponse.username}`,
    ).toString("base64");

    return {
      token,
      user: {
        id: loginResponse.userId,
        username: loginResponse.username,
      },
    };
  }
}

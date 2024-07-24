import { injectable } from "inversify";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    username: string;
  };
}

@injectable()
export class LoginPresenter {
  present(
    accessToken: string,
    refreshToken: string,
    userId: string,
    username: string,
  ): LoginResponse {
    return {
      accessToken,
      refreshToken,
      user: {
        id: userId,
        username,
      },
    };
  }
}

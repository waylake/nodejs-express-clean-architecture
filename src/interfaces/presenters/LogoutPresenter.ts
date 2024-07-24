import { injectable } from "inversify";

interface LogoutResponse {
  message: string;
}

@injectable()
export class LogoutPresenter {
  present(): LogoutResponse {
    return {
      message: "Logged out successfully",
    };
  }
}

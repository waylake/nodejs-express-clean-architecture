import { injectable } from "inversify";

interface RefreshTokenResponse {
  accessToken: string;
}

@injectable()
export class RefreshTokenPresenter {
  present(accessToken: string): RefreshTokenResponse {
    return {
      accessToken,
    };
  }
}

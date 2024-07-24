import { LoginUseCase } from "../../../../src/domain/usecases/LoginUseCase";
import { IUserRepository } from "../../../../src/domain/interfaces/IUserRepository";
import { User } from "../../../../src/domain/entities/User";
import bcrypt from "bcrypt";
import * as jwt from "../../../../src/infrastructure/auth/jwt";

jest.mock("bcrypt");
jest.mock("../../../../src/infrastructure/auth/jwt");

describe("LoginUseCase", () => {
  let loginUseCase: LoginUseCase;
  let mockUserRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      findByUsername: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
      updateRefreshToken: jest.fn(),
    };
    loginUseCase = new LoginUseCase(mockUserRepository);
  });

  it("should return tokens when credentials are valid", async () => {
    const mockUser = new User("1", "testuser", "hashedpassword");
    mockUserRepository.findByUsername.mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.generateAccessToken as jest.Mock).mockReturnValue(
      "mocked-access-token",
    );
    (jwt.generateRefreshToken as jest.Mock).mockReturnValue(
      "mocked-refresh-token",
    );

    const result = await loginUseCase.execute("testuser", "password123");

    expect(result).toEqual({
      accessToken: "mocked-access-token",
      refreshToken: "mocked-refresh-token",
    });
    expect(mockUserRepository.updateRefreshToken).toHaveBeenCalledWith(
      "1",
      "mocked-refresh-token",
    );
  });

  it("should throw an error when credentials are invalid", async () => {
    mockUserRepository.findByUsername.mockResolvedValue(null);

    await expect(
      loginUseCase.execute("testuser", "wrongpassword"),
    ).rejects.toThrow("Invalid credentials");
  });

  it("should throw an error when password is incorrect", async () => {
    const mockUser = new User("1", "testuser", "hashedpassword");
    mockUserRepository.findByUsername.mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(
      loginUseCase.execute("testuser", "wrongpassword"),
    ).rejects.toThrow("Invalid credentials");
  });
});

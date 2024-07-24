import "reflect-metadata";
import { LoginUseCase } from "../../../../src/domain/usecases/LoginUseCase";
import { IUserRepository } from "../../../../src/domain/interfaces/IUserRepository";
import { User } from "../../../../src/domain/entities/User";

describe("LoginUseCase", () => {
  let loginUseCase: LoginUseCase;
  let mockUserRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      findByUsername: jest.fn(),
      save: jest.fn(),
    };
    loginUseCase = new LoginUseCase(mockUserRepository);
  });

  it("should return user data when credentials are valid", async () => {
    const mockUser = new User("1", "testuser", "password123");
    mockUserRepository.findByUsername.mockResolvedValue(mockUser);

    const result = await loginUseCase.execute({
      username: "testuser",
      password: "password123",
    });

    expect(result).toEqual({ userId: "1", username: "testuser" });
  });

  it("should throw an error when credentials are invalid", async () => {
    mockUserRepository.findByUsername.mockResolvedValue(null);

    await expect(
      loginUseCase.execute({ username: "testuser", password: "wrongpassword" }),
    ).rejects.toThrow("Invalid credentials");
  });
});

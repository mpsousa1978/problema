
import { AppError } from "@errors/AppError"
import { ICreateUserDTO } from "@modules/accounts/dtos/IcreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./authenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });


  it("Should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "33333",
      email: "user@test.com",
      password: "1234",
      name: "User tes"
    }
    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    expect(result).toHaveProperty("token");
  });

  it("Should be able to authenticate an nonexistent user", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "fall@com.ddd",
        password: "user.password"
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to authenticate with incorret password", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "89898",
        email: "user@test.com",
        password: "1234",
        name: "User tes error"
      }
      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "user.password,"
      });
    }).rejects.toBeInstanceOf(AppError);
  });
})
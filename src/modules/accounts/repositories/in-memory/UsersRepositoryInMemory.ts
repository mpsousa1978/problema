import { ICreateUserDTO } from "@modules/accounts/dtos/IcreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/Users";
import { IUsersRepository } from "../IUsersRepository";


class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];
  async create({ driver_license, name, email, password }: ICreateUserDTO): Promise<void> {
    const user = new User();
    Object.assign(user, {
      driver_license, name, email, password
    })

    this.users.push(user);
  }
  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email)
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id)
  }
}

export { UsersRepositoryInMemory }
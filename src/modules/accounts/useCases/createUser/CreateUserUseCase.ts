import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs"
import { AppError } from "@errors/AppError"

import { ICreateUserDTO } from "@modules/accounts/dtos/IcreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";


@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository) { }

    async execute({ name, email, driver_license, password }: ICreateUserDTO): Promise<void> {

        const userAlredyExists = await this.usersRepository.findByEmail(email);

        if (userAlredyExists) {
            throw new AppError("User alredy exists", 400);
        }

        const passwordHash = await hash(password, 8);// criptografar a senha
        await this.usersRepository.create({ name, email, driver_license, password: passwordHash });
    }
}

export { CreateUserUseCase }
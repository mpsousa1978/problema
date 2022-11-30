import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs"
import { ICreateUserDTO } from "../../dtos/IcreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "../../../../errors/AppError"

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRespository: IUsersRepository) { }

    async execute({ name, email, driver_license, password }: ICreateUserDTO): Promise<void> {

        const userAlredyExists = await this.usersRespository.findByEmail(email);

        if (userAlredyExists) {
            throw new AppError("User alredy exists", 400);
        }

        const passwordHash = await hash(password, 8);// criptografar a senha
        await this.usersRespository.create({ name, email, driver_license, password: passwordHash });
    }
}

export { CreateUserUseCase }
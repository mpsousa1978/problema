import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { deleteFile } from "../../../../utils/file";
interface IRequest {
  user_id: string;
  avatar_File: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private userRespository: IUsersRepository
  ) { }

  async execute({ user_id, avatar_File }: IRequest): Promise<void> {
    const user = await this.userRespository.findById(user_id);
    if (!user) {
      throw new AppError("Id does not exists");
    }

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatar_File
    await this.userRespository.create(user);

  }


}

export { UpdateUserAvatarUseCase }
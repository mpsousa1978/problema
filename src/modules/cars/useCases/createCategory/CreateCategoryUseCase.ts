import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";

import { ICategoriesRespository } from "../../repositories/ICategoriesRepository";

interface IResquest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRespository) { }

    async execute({ name, description }: IResquest): Promise<void> {

        const categoryAlreadExists = await this.categoriesRepository.findByName(name);

        if (categoryAlreadExists) {
            throw new AppError("Category already exists!")
        }
        await this.categoriesRepository.create({ name, description });
    }

}

export { CreateCategoryUseCase }
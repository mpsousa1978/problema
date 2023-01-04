import { inject, injectable } from "tsyringe";
import { AppError } from "@errors/AppError"
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

//import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IResquest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository) { }

    async execute({ name, description }: IResquest): Promise<void> {

        const categoryAlreadExists = await this.categoriesRepository.findByName(name);

        if (categoryAlreadExists) {
            throw new AppError("Category already exists!")
        }
        await this.categoriesRepository.create({ name, description });
    }

}

export { CreateCategoryUseCase }
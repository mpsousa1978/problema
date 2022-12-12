import { ISpecificationRespository } from "@modules/cars/repositories/ISpecificationRespository";
import { inject, injectable } from "tsyringe";
import { AppError } from "@errors/AppError"


interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpacificationUseCase {
    constructor(
        @inject("SpecificationRepository")
        private specificationRepository: ISpecificationRespository) { }
    //? porque tem que cria IRequest
    async execute({ name, description }: IRequest): Promise<void> {
        const specificationAlredyExists = await this.specificationRepository.findByname(name);

        if (specificationAlredyExists) {
            throw new AppError("Specification already exists!")
            //return response.status(400).json({error: "Category already exists!"})
        }

        await this.specificationRepository.create({
            name,
            description
        })
    }


}


export { CreateSpacificationUseCase }
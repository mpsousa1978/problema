import { getRepository, Repository } from "typeorm";
import { ISpecificationRespository, ISpecificationDTO } from "@modules/cars/repositories/ISpecificationRespository";
import { Specification } from "../entities/Specification";

class SpecificationRepository implements ISpecificationRespository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }

    async create({ name, description }: ISpecificationDTO): Promise<void> {
        const specification = this.repository.create({
            description, name
        });

        await this.repository.save(specification);
    }


    async findByname(name: string): Promise<Specification> {
        const specification = this.repository.findOne({
            name
        });
        return specification;
    }


}

export { SpecificationRepository };
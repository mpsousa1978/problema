import { getRepository, Repository } from "typeorm";
import { ISpecificationsRepository, ISpecificationDTO } from "@modules/cars/repositories/ISpecificationsRepository";
import { Specification } from "../entities/Specification";

class SpecificationRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }

    async create({ name, description }: ISpecificationDTO): Promise<Specification> {
        const specification = this.repository.create({
            description, name
        });

        await this.repository.save(specification);
        return specification;
    }


    async findByname(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({
            name
        });
        return specification;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = await this.repository.findByIds(ids)
        return specifications;
    }

}

export { SpecificationRepository };
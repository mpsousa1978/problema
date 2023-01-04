import { Specification } from "@modules/cars/infra/typeorm/entities/Specification"; // "../infra/typeorm/entities/Specification";


interface ISpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    create({ name, description }: ISpecificationDTO): Promise<Specification>;
    findByname(name: string): Promise<Specification>;
    findByIds(ids: string[]): Promise<Specification[]>;
}



export { ISpecificationsRepository, ISpecificationDTO };
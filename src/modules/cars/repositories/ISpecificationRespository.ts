import { Specification } from "@modules/cars/infra/typeorm/entities/Specification"; // "../infra/typeorm/entities/Specification";


interface ISpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationRespository {
    create({ name, description }: ISpecificationDTO): Promise<void>;
    findByname(name: string): Promise<Specification>;
}



export { ISpecificationRespository, ISpecificationDTO };
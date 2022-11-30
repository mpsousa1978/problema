import { Specification } from "../entities/Specification";

interface ISpecificationDTO{
    name : string;
    description : string;
}

interface ISpecificationRespository{
    create({name, description } : ISpecificationDTO): Promise<void>;
    findByname(name:string): Promise<Specification>;
}


 
export {ISpecificationRespository,ISpecificationDTO};
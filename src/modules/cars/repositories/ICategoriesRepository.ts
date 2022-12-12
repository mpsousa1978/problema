import { Category } from "@modules/cars/infra/typeorm/entities/Category"; //"../infra/typeorm/entities/Category";



//DTO => Data transfer object
interface ICreateCategoryDTO {
    name: string;
    description: string;
}


interface ICategoriesRespository {
    findByName(name: string): Promise<Category>;
    list(): Promise<Category[]>;
    create({ name, description }: ICreateCategoryDTO): Promise<void>;

}


export { ICategoriesRespository, ICreateCategoryDTO };
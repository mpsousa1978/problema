//import { getRepository, Repository } from "typeorm";
import { getRepository, Repository } from "typeorm";
import { Category } from "../../entities/Category";
import { ICategoriesRespository, ICreateCategoryDTO } from "../ICategoriesRepository";


class CategoriesRepository implements ICategoriesRespository {
    private repository: Repository<Category>;

    //private static INSTANCE : CategoriesRepository;

    //private constructor() {
    constructor() {
        this.repository = getRepository(Category);
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({
            description, name
        })

        await this.repository.save(category)
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({ name })
        return category;
    }
}

export { CategoriesRepository }
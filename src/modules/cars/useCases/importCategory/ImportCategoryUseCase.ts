import { parse as csvParse } from "csv-parse";
import { inject, injectable } from "tsyringe";
import fs from "fs";
import { ICategoriesRespository } from "@modules/cars/repositories/ICategoriesRepository";

//import { ICategoriesRespository } from "../../repositories/ICategoriesRepository";

interface IImpportCategory {
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRetository: ICategoriesRespository) { }

    loadCategories(file: Express.Multer.File): Promise<IImpportCategory[]> {
        return new Promise((resolve, reject) => { //promise, aguarda fazer o processamento para depois ir para o proximo processo
            const stream = fs.createReadStream(file.path);
            const categories: IImpportCategory[] = [];
            const parseFile = csvParse();

            stream.pipe(parseFile);

            parseFile.on("data", async (line) => {
                const [name, description] = line;
                categories.push({
                    name, description
                });
            }).on("end", () => {
                fs.promises.unlink(file.path); //elimina arquivo 
                resolve(categories);
            }).on("Error", (err) => {
                reject(err);
            })
        }
        )
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);

        categories.map(async category => {
            const { name, description } = category;
            const existsCategory = await this.categoriesRetository.findByName(name);

            if (!existsCategory) {
                await this.categoriesRetository.create({
                    name, description,
                })
            }
        })
    }
}

export { ImportCategoryUseCase }
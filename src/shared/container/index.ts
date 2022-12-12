
import { container } from "tsyringe";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRespository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRespository";
import { ICategoriesRespository } from "@modules/cars/repositories/ICategoriesRepository"

import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRespository";
import { ISpecificationRespository } from "@modules/cars/repositories/ISpecificationRespository";

import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRespository";
import { ICarsRespository } from "@modules/cars/repositories/ICarsRepository";


// ICategoriesRespository
container.registerSingleton<ICategoriesRespository>(
    "CategoriesRepository",
    CategoriesRepository
);

// ICategoriesRespository
container.registerSingleton<ISpecificationRespository>(
    "SpecificationRepository",
    SpecificationRepository
);

container.registerSingleton<IUsersRepository>(
    "UsersRepository", UsersRepository
)

container.registerSingleton<ICarsRespository>(
    "CarsRepository", CarsRepository
)
import { container } from "tsyringe";

import { UsersRepository } from "../../modules/accounts/repositories/implementations/UsersRespository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";

import { ICategoriesRespository } from "../../modules/cars/repositories/ICategoriesRepository"
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRespository"

import { SpecificationRepository } from "../../modules/cars/repositories/implementations/SpecificationRespository";
import { ISpecificationRespository } from "../../modules/cars/repositories/ISpecificationRespository";

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
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarsSpecificationUseCase } from "./createCarsSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarsSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Car Spefification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationRepositoryInMemory = new SpecificationsRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarsSpecificationUseCase(carsRepositoryInMemory, specificationRepositoryInMemory);
  })
  it("should be able to add a new specification to a no-existent car", async () => {
    expect(async () => {
      const car_id = "1234";
      const specifications_id = ["12132"];

      await createCarSpecificationUseCase.execute({ car_id, specifications_id });
    }).rejects.toBeInstanceOf(AppError);
  });


  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "name car",
      description: "description car",
      daily_rate: 100,
      license_plate: "abv-34",
      fine_amount: 60,
      brand: "brand",
      category_id: "caegory"
    });

    const specification = await specificationRepositoryInMemory.create({
      description: "test",
      name: "test"
    });

    const specifications_id = [specification.id]
    const specificationCars = await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id });

    expect(specificationCars).toHaveProperty("specifications");
    expect(specificationCars.specifications.length).toBe(1);
  });

});

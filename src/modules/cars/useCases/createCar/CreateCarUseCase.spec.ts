
import { CarsRespositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase
let carsRespositoryInMemory: CarsRespositoryInMemory;

describe("Create car", () => {
  beforeEach(() => {
    carsRespositoryInMemory = new CarsRespositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRespositoryInMemory);
  })

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "name car",
      description: "description car",
      daily_rate: 100,
      license_plate: "abv-34",
      fine_amount: 60,
      brand: "brand",
      category_id: "caegory"
    });
    expect(car).toHaveProperty("id");
  });

  it("should be able to create a car with exists license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "name car",
        description: "description car",
        daily_rate: 100,
        license_plate: "abv-345",
        fine_amount: 60,
        brand: "brand",
        category_id: "caegory"
      });

      await createCarUseCase.execute({
        name: "name car2",
        description: "description car",
        daily_rate: 100,
        license_plate: "abv-345",
        fine_amount: 60,
        brand: "brand",
        category_id: "caegory"
      });
    }).rejects.toBeInstanceOf(AppError);
  })

  it("should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car2 available",
      description: "description car",
      daily_rate: 100,
      license_plate: "abv-3666",
      fine_amount: 60,
      brand: "brand",
      category_id: "caegory"
    });
    expect(car.available).toBe(true);
  });

});

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase
let carsRespositoruInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRespositoruInMemory = new CarsRepositoryInMemory()
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRespositoruInMemory);
  });

  it("shoould be able to list available cars", async () => {
    const car = await carsRespositoruInMemory.create({
      name: "Car1",
      description: "bolinha",
      daily_rate: 140.00,
      license_plate: "aa-222",
      fine_amount: 100,
      brand: "Audi",
      category_id: "caterory_id"
    })

    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  })

  it("should be able to list all available cars by name", async () => {
    const car = await carsRespositoruInMemory.create({
      name: "Car1",
      description: "bolinha",
      daily_rate: 140.00,
      license_plate: "aa-222",
      fine_amount: 100,
      brand: "Audi2",
      category_id: "caterory_id"
    })

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car1"
    });
    expect(cars).toEqual([car]);
  })

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRespositoruInMemory.create({
      name: "Car1",
      description: "bolinha",
      daily_rate: 140.00,
      license_plate: "aa-222",
      fine_amount: 100,
      brand: "Audi2",
      category_id: "caterory_id"
    })

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Audi2"
    });
    expect(cars).toEqual([car]);
  })

  it("should be able to list all available cars by category", async () => {
    const car = await carsRespositoruInMemory.create({
      name: "Car1",
      description: "bolinha",
      daily_rate: 140.00,
      license_plate: "aa-222",
      fine_amount: 100,
      brand: "Audi2",
      category_id: "12345"
    })

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "12345"
    });
    expect(cars).toEqual([car]);
  })

}
)
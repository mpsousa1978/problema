import { inject, injectable } from "tsyringe";
import { ICarsRespository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}
//name,description,daily_rate,license_plate,fine_amount,brand,category_id

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRespository: ICarsRespository
  ) {

  }
  async execute({ name, description, daily_rate, license_plate, fine_amount, brand, category_id }: IRequest): Promise<Car> {
    const carAlredyExists = await this.carsRespository.findByLincensePlate(license_plate);

    if (carAlredyExists) {
      throw new AppError("Car alredy exists");
    }

    const car = await this.carsRespository.create({
      name, description, daily_rate, license_plate, fine_amount, brand, category_id
    })

    return car;
  }
}

export { CreateCarUseCase }
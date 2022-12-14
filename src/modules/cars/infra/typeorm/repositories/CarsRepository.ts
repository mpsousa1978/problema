import { getRepository, Repository } from "typeorm";
import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Car } from "../entities/Car";


class CarsRepository implements ICarsRepository {

  private Repository: Repository<Car>;

  constructor() {
    this.Repository = getRepository(Car);
  }

  async create({ brand, category_id, daily_rate, description, fine_amount, license_plate, name, specifications, id }: ICreateCarDTO): Promise<Car> {
    const car = this.Repository.create({
      brand, category_id, daily_rate, description, fine_amount, license_plate, name, specifications, id
    });
    await this.Repository.save(car);
    return car;

  }
  async findByLincensePlate(license_plate: string): Promise<Car> {
    const car = await this.Repository.findOne({ license_plate });
    return car;
  }

  async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
    const carsQuery = await this.Repository
      .createQueryBuilder("c")
      .where("c.available=:available", { available: true });

    if (brand) {
      carsQuery.andWhere("c.brand = :brand", { brand })
    }

    if (category_id) {
      carsQuery.andWhere("c.category_id = :category_id", { category_id })
    }

    if (name) {
      carsQuery.andWhere("c.name = :name", { name })
    }

    const cars = await carsQuery.getMany();
    return cars;
  }

  async findById(id: string): Promise<Car> {
    const car = await this.Repository.findOne(id)
    return car;
  }

}

export { CarsRepository };
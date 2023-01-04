import dayjs from "dayjs"

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateprovider";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase"


let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateprovider: DayjsDateProvider;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(2, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateprovider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateprovider);
  });


  it("Should be able to create a new rental", async () => {

    const rental = await createRentalUseCase.execute({
      user_id: "123",
      car_id: "123213",
      expected_return_date: dayAdd24Hours
    });

    //console.log(rental)
    expect(rental).toHaveProperty("id");
  });

  it("Should not be able to create a new rental if there is another open to de same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "123213",
        expected_return_date: dayAdd24Hours
      });

      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "123213",
        expected_return_date: dayAdd24Hours
      });
    }).rejects.toBeInstanceOf(AppError)
  });

  it("Should not be able to create a new rental if there is another open to de same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "teste",
        expected_return_date: dayAdd24Hours
      });

      await createRentalUseCase.execute({
        user_id: "345",
        car_id: "teste",
        expected_return_date: new Date()
      });
    }).rejects.toBeInstanceOf(AppError)
  });

  it("Should not be able to create a new rental with invalid return time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "teste",
        expected_return_date: dayjs().toDate()
      });
    }).rejects.toBeInstanceOf(AppError)
  });

});

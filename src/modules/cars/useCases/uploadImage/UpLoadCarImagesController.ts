import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpLoadCarImagesUseCase } from "./UpLoadCarImagesUseCase";

interface IFiles {
  filename: string;
}

class UpLoadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const images = request.files as IFiles[];

    const upLoadCarImagesUseCase = container.resolve(UpLoadCarImagesUseCase)

    const images_name = images.map((file) => file.filename);

    await upLoadCarImagesUseCase.execute({
      car_id: id,
      images_name
    });
    return response.status(201).send();
  }
}

export { UpLoadCarImagesController }
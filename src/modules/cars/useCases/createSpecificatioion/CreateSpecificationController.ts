import {Request,Response} from "express";
import { CreateSpacificationUseCase } from "./CreateSpecificationUseCase";
import {container} from "tsyringe";

class CreateSpecificationController{
    async handle (request: Request, response: Response) : Promise<Response>{
        const {name,description} = request.body;
        const createSpecificationUseCase = container.resolve(CreateSpacificationUseCase);
        await createSpecificationUseCase.execute({name,description})
        return response.status(201).send();
    }
}

export{CreateSpecificationController}
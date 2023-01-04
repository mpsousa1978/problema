import { Router } from "express"
import multer from "multer";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/CreateCarsSpecification/creaeCarsSpecificationControlle";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { UpLoadCarImagesController } from "@modules/cars/useCases/uploadImage/UpLoadCarImagesController";

//import uploadConfig from "config/upload"
import uploadConfig from "../../../../config/upload"

const carsRoutes = Router();

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const upLoadCarImagesController = new UpLoadCarImagesController()

const upload = multer(uploadConfig.upload("./tmp/cars"));

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);

carsRoutes.get("/available", listAvailableCarsController.handle);

carsRoutes.post("/specification/:id", ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle)

carsRoutes.post("/images/:id", ensureAuthenticated, ensureAdmin, upload.array("images"), upLoadCarImagesController.handle)

export { carsRoutes };
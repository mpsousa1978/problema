import { Router } from 'express';
import { CreateSpecificationController } from '@modules/cars/useCases/createSpecificatioion/CreateSpecificationController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

//import { CreateSpecificationController } from '../modules/cars/useCases/createSpecificatioion/CreateSpecificationController';

const specificationsRoutes = Router();
const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes };
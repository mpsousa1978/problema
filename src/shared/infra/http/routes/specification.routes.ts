import { Router } from 'express';
import { CreateSpecificationController } from '@modules/cars/useCases/createSpecificatioion/CreateSpecificationController';

import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

//import { CreateSpecificationController } from '../modules/cars/useCases/createSpecificatioion/CreateSpecificationController';

const specificationsRoutes = Router();
const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post("/", ensureAuthenticated, ensureAdmin, createSpecificationController.handle);

export { specificationsRoutes };
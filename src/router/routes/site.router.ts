import { Router } from 'express';
import { validationMiddleware } from '../../validators/validationErorrsMiddleware';
import { createSiteDTOValidator } from '../../validators/createDTOValidator';
import { CustomerController } from '../../controllers/customer.controller';
import { updateSiteDTOValidator } from '../../validators/updateDTOValidator';
import { SiteController } from '../../controllers/site.controller';

export const siteRouter = Router();

siteRouter.post(
  '/create',
  createSiteDTOValidator,
  validationMiddleware,
  SiteController.createNewSite,
);

siteRouter.put(
  '/update',
  updateSiteDTOValidator,
  validationMiddleware,
  SiteController.update,
);

siteRouter.get('/getAll', CustomerController.getAll);

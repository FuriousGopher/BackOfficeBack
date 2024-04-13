import { Router } from 'express';
import { validationMiddleware } from '../../validators/validationErorrsMiddleware';
import { createDTOValidator } from '../../validators/createDTOValidator';
import { CustomerController } from '../../controllers/customer.controller';
import { updateDTOValidator } from '../../validators/updateDTOValidator';

export const customerRouter = Router();

customerRouter.post(
  '/create',
  createDTOValidator,
  validationMiddleware,
  CustomerController.createNewCustomer,
);

customerRouter.put(
  '/update',
  updateDTOValidator,
  validationMiddleware,
  CustomerController.update,
);

customerRouter.get('/getAll', CustomerController.getAll);

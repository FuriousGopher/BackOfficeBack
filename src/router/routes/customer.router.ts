import { Router } from 'express';
import { validationMiddleware } from '../../validators/validationErorrsMiddleware';
import { createCustomerDTOValidator } from '../../validators/createDTOValidator';
import { CustomerController } from '../../controllers/customer.controller';
import { updateDTOValidator } from '../../validators/updateDTOValidator';

export const customerRouter = Router();

customerRouter.post(
  '/create',
  createCustomerDTOValidator,
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

customerRouter.get('/getAllInfo', CustomerController.getAllInfo);

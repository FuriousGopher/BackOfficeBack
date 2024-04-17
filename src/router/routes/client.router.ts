import { Router } from 'express';
import { emailVatNumberValidator } from '../../validators/emailLoginValidatorInput';
import { validationMiddleware } from '../../validators/validationErorrsMiddleware';
import { ClientController } from '../../controllers/client.controller';
import { CustomerController } from '../../controllers/customer.controller';

export const clientRouter = Router();

clientRouter.post(
  '/login',
  emailVatNumberValidator,
  validationMiddleware,
  ClientController.login,
);

clientRouter.get('/getAllInfo', CustomerController.getAllInfo);

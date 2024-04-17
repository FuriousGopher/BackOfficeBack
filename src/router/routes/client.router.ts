import { Router } from 'express';
import {
  emailPasswordValidator,
  emailVatNumberValidator,
} from '../../validators/emailLoginValidatorInput';
import { validationMiddleware } from '../../validators/validationErorrsMiddleware';
import { ClientController } from '../../controllers/client.controller';

export const clientRouter = Router();

clientRouter.post(
  '/login',
  emailVatNumberValidator,
  validationMiddleware,
  ClientController.login,
);

clientRouter.post('/get-client-id', ClientController.getClientId);
clientRouter.post('/get-client-id', ClientController.logOut);

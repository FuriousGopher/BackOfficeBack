import { Router } from 'express';
import { validationMiddleware } from '../../validators/validationErorrsMiddleware';
import { emailPasswordValidator } from '../../validators/emailLoginValidatorInput';
import { validatorForCookieToken } from '../../validators/validatorForCookieToken';
import { AuthController } from '../../controllers/auth.controller';

export const authRouter = Router();

authRouter.post(
  '/login',
  emailPasswordValidator,
  validationMiddleware,
  AuthController.loginAuth,
);

authRouter.post('/logout', validatorForCookieToken, AuthController.logOut);

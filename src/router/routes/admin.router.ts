import { Router } from 'express';
import { validationMiddleware } from '../../validators/validationErorrsMiddleware';
import { emailPasswordValidator } from '../../validators/emailLoginValidatorInput';
import { validatorForCookieToken } from '../../validators/validatorForCookieToken';
import { AuthController } from '../../controllers/auth.controller';
import { AdminController } from '../../controllers/admin.controller';

export const adminRouter = Router();

adminRouter.post('/create-new-admin', AdminController.createNewAdmin);

adminRouter.post('/delete-admin');

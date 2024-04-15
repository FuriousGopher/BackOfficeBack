import { Router } from 'express';
import { AdminController } from '../../controllers/admin.controller';
import {emailPasswordValidator} from "../../validators/emailLoginValidatorInput";
import {validationMiddleware} from "../../validators/validationErorrsMiddleware";

export const adminRouter = Router();

adminRouter.post('/create-new-admin',emailPasswordValidator,validationMiddleware, AdminController.createNewAdmin);

adminRouter.post('/delete-admin', AdminController.deleteAdmin);

import { Router } from 'express';
import { AdminController } from '../../controllers/admin.controller';

export const adminRouter = Router();

adminRouter.post('/create-new-admin', AdminController.createNewAdmin);

adminRouter.post('/delete-admin', AdminController.deleteAdmin); //TODO test it

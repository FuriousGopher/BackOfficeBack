import { Router } from 'express';
import { validationMiddleware } from '../../validators/validationErorrsMiddleware';
import { createMeterDTOValidator } from '../../validators/createDTOValidator';
import { updateMeterDTOValidator } from '../../validators/updateDTOValidator';
import { MeterController } from '../../controllers/meter.controller';

export const meterRouter = Router();

meterRouter.post(
  '/create',
  createMeterDTOValidator,
  validationMiddleware,
  MeterController.createNewMeter,
);

meterRouter.put(
  '/update',
  updateMeterDTOValidator,
  validationMiddleware,
  MeterController.update,
);

meterRouter.get('/getAll', MeterController.getAllBySiteId);

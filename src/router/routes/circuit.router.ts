import { Router } from 'express';
import { validationMiddleware } from '../../validators/validationErorrsMiddleware';
import { createCircuitDTOValidator } from '../../validators/createDTOValidator';
import { updateCircuitDTOValidator } from '../../validators/updateDTOValidator';
import { CircuitController } from '../../controllers/circuit.controller';

export const circuitRouter = Router();

circuitRouter.post(
  '/create',
  createCircuitDTOValidator,
  validationMiddleware,
  CircuitController.createNewCircuit,
);

circuitRouter.put(
  '/update',
  updateCircuitDTOValidator,
  validationMiddleware,
  CircuitController.update,
);

circuitRouter.get('/getAllById', CircuitController.getAllByMeterId);

circuitRouter.get('/getAll', CircuitController.getAllCircuits);

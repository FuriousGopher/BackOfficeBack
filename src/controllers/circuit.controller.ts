import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createCircuitDTO, updateCircuitDTO } from '../types/types';
import { CircuitService } from '../services/circuit.service';
import { CircuitRepository } from '../repositories/circuit.repository';
import { CustomerRepository } from '../repositories/customer.repository';

export class CircuitController {
  static async createNewCircuit(req: Request, res: Response) {
    try {
      const createCircuitDTO = req.body as createCircuitDTO;
      await CircuitService.newCircuit(createCircuitDTO);
      res.status(StatusCodes.OK).send('Successfully created new circuit');
    } catch (e: any) {
      res.status(StatusCodes.BAD_REQUEST).send(e.message);
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const updateCircuitDTO = req.body as updateCircuitDTO;
      await CircuitService.updateCircuit(updateCircuitDTO);
      res.status(StatusCodes.OK).send('Successfully updated circuit');
    } catch (e: any) {
      res.status(StatusCodes.BAD_REQUEST).send(e.message);
    }
  }

  static async getAllByMeterId(req: Request, res: Response) {
    try {
      const result = await CircuitRepository.findAllById(+req.body.meterId);
      if (!result) {
        res.sendStatus(StatusCodes.NOT_FOUND);
      }
      res.status(StatusCodes.OK).json(result);
    } catch (e: any) {
      res.status(StatusCodes.BAD_REQUEST).send(e.message);
    }
  }

  static async getAllCircuits(_req: Request, res: Response) {
    try {
      const result = await CircuitRepository.findAll();
      if (!result) {
        res.sendStatus(StatusCodes.NOT_FOUND);
      }
      res.status(StatusCodes.OK).json(result);
    } catch (e: any) {
      res.status(StatusCodes.BAD_REQUEST).send(e.message);
    }
  }
}

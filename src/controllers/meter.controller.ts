import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createMeterDTO, updateMeterDTO } from '../types/types';
import { MeterService } from '../services/meter.service';
import { MeterRepository } from '../repositories/meter.repository';
import { CustomerRepository } from '../repositories/customer.repository';

export class MeterController {
  static async createNewMeter(req: Request, res: Response) {
    try {
      const createMeterDTO = req.body as createMeterDTO;
      await MeterService.newMeter(createMeterDTO);
      res.status(StatusCodes.OK).send('Successfully created new meter');
    } catch (e: any) {
      res.status(StatusCodes.BAD_REQUEST).send(e.message);
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const updateMeterDTO = req.body as updateMeterDTO;
      await MeterService.updateMeter(updateMeterDTO);
      res.status(StatusCodes.OK).send('Successfully updated meter');
    } catch (e: any) {
      res.status(StatusCodes.BAD_REQUEST).send(e.message);
    }
  }

  static async getAllBySiteId(req: Request, res: Response) {
    try {
      const result = await MeterRepository.findAllById(+req.body.siteId);
      if (!result) {
        res.sendStatus(StatusCodes.NOT_FOUND);
      }
      res.status(StatusCodes.OK).json(result);
    } catch (e: any) {
      res.status(StatusCodes.BAD_REQUEST).send(e.message);
    }
  }

  static async getAllMeters(_req: Request, res: Response) {
    try {
      const result = await MeterRepository.findAll();
      if (!result) {
        res.sendStatus(StatusCodes.NOT_FOUND);
      }
      res.status(StatusCodes.OK).json(result);
    } catch (e: any) {
      res.status(StatusCodes.BAD_REQUEST).send(e.message);
    }
  }
}

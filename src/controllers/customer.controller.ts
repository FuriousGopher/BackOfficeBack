import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CustomerService } from '../services/customer.service';
import { updateCustomerDTO } from '../types/types';
import { CustomerRepository } from '../repositories/customer.repository';

export class CustomerController {
  static async createNewCustomer(req: Request, res: Response) {
    try {
      const { name, email, vatNumber } = req.body as {
        name: string;
        email: string;
        vatNumber: string;
      };
      await CustomerService.newCustomer(name, email, vatNumber);
      res.status(StatusCodes.OK).send('Successfully created new customer');
    } catch (e: any) {
      res.status(StatusCodes.BAD_REQUEST).send(e.message);
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const updateCustomerDTO = req.body as updateCustomerDTO;
      await CustomerService.updateCustomer(updateCustomerDTO);
      res.status(StatusCodes.OK).send('Successfully updated customer');
    } catch (e: any) {
      res.status(StatusCodes.BAD_REQUEST).send(e.message);
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const result = await CustomerRepository.findAll();
      if (!result) {
        res.sendStatus(StatusCodes.NOT_FOUND);
      }
      res.status(StatusCodes.OK).json(result);
    } catch (e: any) {
      res.status(StatusCodes.BAD_REQUEST).send(e.message);
    }
  }

  static async getAllInfo(req: Request, res: Response) {
    try {
      const customerId = req.query.id!;
      const result = await CustomerService.findAllInfoById(+customerId);
      if (!result) {
        res.sendStatus(StatusCodes.NOT_FOUND);
      }
      res.status(StatusCodes.OK).json(result);
    } catch (e: any) {
      res.status(StatusCodes.BAD_REQUEST).send(e.message);
    }
  }
}

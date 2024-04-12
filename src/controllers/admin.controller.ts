import { Request, Response } from 'express';
import { CreateAdminDTO } from '../types/types';
import { AdminRepository } from '../repositories/admin.repository';
import { StatusCodes } from 'http-status-codes';
import { AdminService } from '../services/admin.service';

export class AdminController {
  static async createNewAdmin(req: Request, res: Response): Promise<void> {
    try {
      const newAdmin: CreateAdminDTO = {
        email: req.body.email,
        password: req.body.password,
      };
      await AdminService.createNewAdmin(newAdmin);
      res.status(StatusCodes.OK).send('Successfully created new admin');
    } catch (e) {
      console.error(e);
      res.status(StatusCodes.BAD_REQUEST).send(e);
    }
  }
}

import { Request, Response } from 'express';
import { CreateAdminDTO } from '../types/types';
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
      res.sendStatus(StatusCodes.BAD_REQUEST);
    }
  }

  static async deleteAdmin(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body);
      const adminId = req.body.adminId;
      await AdminService.delete(+adminId);
      res.status(StatusCodes.OK).send('Successfully deleted admin');
    } catch (e: any) {
      console.error(e);
      res.status(StatusCodes.BAD_REQUEST).send(e.message);
    }
  }
}

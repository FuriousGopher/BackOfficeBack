import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JwtService } from '../helpers/jwt-service';
import { ClientService } from '../services/client.service';

export class ClientController {
  static login = async (req: Request, res: Response) => {
    const result = await ClientService.checkCredentials(
      req.body.email,
      req.body.vatNumber,
    );
    if (result) {
      res.json(result.id);
    } else {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .send('The email or vat_number is wrong');
    }
  };

  static logOut = async (_req: Request, res: Response) => {
    res.clearCookie('AUTH_TOKEN').sendStatus(StatusCodes.NO_CONTENT);
  };

  static getClientId() {}
}

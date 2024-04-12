import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { StatusCodes } from 'http-status-codes';
import { JwtService } from '../helpers/jwt-service';

export class AuthController {
  static loginAuth = async (req: Request, res: Response) => {
    const result = await AuthService.checkCredentials(
      req.body.email,
      req.body.password,
    );
    if (result) {
      const newRefreshToken = await JwtService.createRefreshTokenJWT(result.id);
      console.log(newRefreshToken);
      res
        .cookie('AUTH_TOKEN', newRefreshToken, {
          httpOnly: true,
          secure: true,
        })
        .sendStatus(StatusCodes.OK);
    } else {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .send('The password or login is wrong');
    }
  };

  static logOut = async (req: Request, res: Response) => {
    res.clearCookie('AUTH_TOKEN').sendStatus(StatusCodes.NO_CONTENT);
  };
}

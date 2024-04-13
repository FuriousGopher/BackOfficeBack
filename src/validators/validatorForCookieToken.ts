import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JwtService } from '../helpers/jwt-service';
import { AdminRepository } from '../repositories/admin.repository';

export const AUTH_TOKEN = 'AUTH_TOKEN';

export const validatorForCookieToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cookieRefreshToken = req.cookies[AUTH_TOKEN];
    if (!cookieRefreshToken) return res.sendStatus(StatusCodes.UNAUTHORIZED);

    const adminId = await JwtService.getUserIdByToken(cookieRefreshToken);
    if (!adminId) return res.sendStatus(StatusCodes.UNAUTHORIZED);
    const admin = await AdminRepository.findAdminById(adminId.adminId);
    if (!admin) return res.sendStatus(StatusCodes.UNAUTHORIZED);

    // @ts-ignore
    req.admin = admin;

    next();
  } catch (error) {
    console.error(error);
    res.sendStatus(StatusCodes.UNAUTHORIZED);
  }
};

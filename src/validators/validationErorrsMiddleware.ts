import { NextFunction, Request, Response } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import { ErrorType } from '../types/types';
import { StatusCodes } from 'http-status-codes';

export const validationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsMessages: ErrorType[] = errors
      .array({ onlyFirstError: true })
      .map((error: ValidationError) => {
        return { message: error.msg, field: error.param };
      });
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ errorsMessages: errorsMessages });
  }
  next();
};

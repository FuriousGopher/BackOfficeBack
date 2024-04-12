import { StatusCodes } from 'http-status-codes';

export type ErrorType = {
  message: string;
  field: string;
};

export class HttpError extends Error {
  public readonly statusCode: StatusCodes;

  constructor(message: string, statusCode: StatusCodes) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
}

export type CreateAdminDTO = {
  email: string;
  password: string;
};

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

export type updateCustomerDTO = {
  id: number;
  name: string;
  email: string;
  vat_number: string;
  isDelete: boolean;
};

export type createSiteDTO = {
  name: string;
  coordinates: string;
  post_code: string;
  address: string;
};

export type updateSiteDTO = {
  id: number;
  name: string;
  coordinates: string;
  post_code: string;
  address: string;
  isDelete: boolean;
};

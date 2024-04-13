import { body } from 'express-validator';

export const createCustomerDTOValidator = [
  body('name').isString().trim().notEmpty().withMessage('name required'),
  body('email').isString().trim().notEmpty().withMessage('email required'),
  body('vatNumber')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('vat number required'),
];

export const createSiteDTOValidator = [
  body('name').isString().trim().notEmpty().withMessage('name required'),
  body('customerId')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('customer id required'),
  body('coordinates')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('coordinates required'),
  body('post_code')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('post code required'),
  body('address').isString().trim().notEmpty().withMessage('address required'),
];

export const createMeterDTOValidator = [
  body('name').isString().trim().notEmpty().withMessage('name required'),
  body('serialNumber')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('serialNumber required'),
  body('installationDate')
    .isDate()
    .trim()
    .notEmpty()
    .withMessage('installationDate required'),
  body('siteId').isString().trim().notEmpty().withMessage('site id required'),
];

export const createCircuitDTOValidator = [
  body('name').isString().trim().notEmpty().withMessage('name required'),
  body('is_main').isBoolean().withMessage('is main required'),
  body('installationDate').isDate().withMessage('installation date required'),
  body('meterID').isString().trim().notEmpty().withMessage('meter id required'),
];

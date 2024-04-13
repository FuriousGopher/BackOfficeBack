import { body } from 'express-validator';

export const updateDTOValidator = [
  body('id').isNumeric().withMessage('id required'),
  body('name').isString().trim().optional(),
  body('email').isString().trim().optional(),
  body('vat_number').isString().trim().optional(),
  body('isDelete').isBoolean().optional(),
];

export const updateSiteDTOValidator = [
  body('id').isNumeric().withMessage('id required'),
  body('name').isString().trim().optional(),
  body('coordinates').isString().trim().optional(),
  body('address').isString().trim().optional(),
  body('post_code').isString().trim().optional(),
  body('isDelete').isBoolean().optional(),
];

export const updateMeterDTOValidator = [
  body('id').isNumeric().withMessage('id required'),
  body('name').isString().trim().optional(),
  body('serialNumber').isString().trim().optional(),
  body('installationDate').isString().trim().optional(),
  body('isDelete').isBoolean().optional(),
];

export const updateCircuitDTOValidator = [
  body('id').isNumeric().withMessage('id required'),
  body('name').isString().trim().optional(),
  body('is_main').isBoolean().trim().optional(),
  body('installationDate').isDate().trim().optional(),
  body('isDelete').isBoolean().optional(),
];

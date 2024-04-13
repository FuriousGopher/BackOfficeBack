import { body } from 'express-validator';

export const createDTOValidator = [
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

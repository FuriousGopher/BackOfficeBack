import { body } from 'express-validator';

export const emailPasswordValidator = [
  body('email').isString().trim().notEmpty().withMessage('email required'),
  body('password')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('password is required'),
];

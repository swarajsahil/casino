import { body, validationResult } from 'express-validator';

export const validateSubscription = [
  body('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
  body('adult').toBoolean().isBoolean().withMessage('Adult confirmation must be a boolean'),
  body('contact').toBoolean().isBoolean().withMessage('Contact agreement must be a boolean')
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
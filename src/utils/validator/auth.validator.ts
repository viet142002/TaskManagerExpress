import { body } from 'express-validator'

export const validateAuth = {
    register: [
        body('email').trim().isEmail().withMessage('Email invalid'),
        body('password').isString().withMessage('Password invalid').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
        body('fullname').trim().isString().withMessage('Fullname invalid').notEmpty().withMessage('Fullname cannot be empty')
    ],
    login: [body('email').isEmail().withMessage('Email invalid'), body('password').isString().withMessage('Password invalid')]
}

import { body } from 'express-validator'

export const validateAuth = {
    register: [
        body('email').isEmail().withMessage('Email invalid'),
        body('password').isString().withMessage('Password invalid'),
        body('fullname').isString().withMessage('fullname invalid')
    ],
    login: [body('email').isEmail().withMessage('Email invalid'), body('password').isString().withMessage('Password invalid')]
}

import { body } from 'express-validator'

export const validateProject = {
    create: [body('name').isString().withMessage('Name invalid'), body('description').isString().withMessage('Description invalid')],
    update: [body('email').isEmail().withMessage('Email invalid'), body('password').isString().withMessage('Password invalid')]
}

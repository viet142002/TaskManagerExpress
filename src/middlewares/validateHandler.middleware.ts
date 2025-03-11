import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { commonException } from '~/utils/helpers/exceptions'

export const validationHandler = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const message = errors
            .array()
            .map((err) => err.msg)
            .join(', ')
        next(commonException.inputInvalid(message))
    }
    next()
}

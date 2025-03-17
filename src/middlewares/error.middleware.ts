import { NextFunction, Response } from 'express'
import { ERR_CODE } from '~/utils/constants'
import HttpException from '~/utils/helpers/exceptions/httpException'

export default function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
    const status = error.status || 500
    const message = error.message || 'Something went wrong'
    const code = error.code || ERR_CODE.INTERNAL_SERVER_ERROR

    console.log('error handler', status, message, code)

    response.status(status).json({
        success: false,
        status,
        error: {
            code,
            message
        }
    })
}

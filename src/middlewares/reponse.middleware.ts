import { NextFunction, Response } from 'express'
import { commonException } from '~/utils/helpers/exceptions'

export default function responseMiddleware(req: Request, res: Response, next: NextFunction) {
    const responseData = res.locals?.responseData

    if (responseData) {
        if (responseData.isList) {
            res.status(responseData.status).json({
                success: true,
                status: responseData.status,
                message: responseData.message,
                data: responseData.data,
                pagination: responseData.pagination
            })
        } else {
            res.status(responseData.status).json({
                success: true,
                status: responseData.status,
                message: responseData.message,
                data: responseData.data
            })
        }
    } else {
        throw commonException.notFound('Api not found')
    }
}

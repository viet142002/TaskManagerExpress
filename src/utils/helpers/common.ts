import { NextFunction, Request, Response } from 'express'
import { ResponseFormatted } from '~/utils/types'

type MiddlewareFn = (req: Request, res: Response, next: NextFunction) => Promise<void> | void
type ControllerFn = (req: Request, res: Response, next: NextFunction, responseWithFormat: (data: ResponseFormatted) => void) => Promise<void> | void

export const wrapperMiddle = (fn: MiddlewareFn) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next)
    }
}

export const wrapperController = (fn: ControllerFn) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const responseWithData = (data: ResponseFormatted) => {
            res.locals.responseData = data
            next()
        }
        Promise.resolve(fn(req, res, next, responseWithData)).catch(next)
    }
}

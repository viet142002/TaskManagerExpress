import { EXCEPTIONS } from '~/utils/constants'

export default class HttpException extends Error {
    status: number
    message: string
    code: string
    constructor(status: number, code: string, message: string) {
        super(message)
        this.status = status
        this.message = message
        this.code = code
    }
}

export const httpExceptions = {
    badRequest: (code: string, message: string) => new HttpException(EXCEPTIONS.BAD_REQUEST, code, message),
    unauthorized: (code: string, message: string) => new HttpException(EXCEPTIONS.UNAUTHORIZE, code, message),
    forbidden: (code: string, message: string) => new HttpException(EXCEPTIONS.FORBIDDEN, code, message),
    notFound: (code: string, message: string) => new HttpException(EXCEPTIONS.NOT_FOUND, code, message),
    serverError: (code: string, message: string) => new HttpException(EXCEPTIONS.INTERNAL_SERVER_ERROR, code, message)
}

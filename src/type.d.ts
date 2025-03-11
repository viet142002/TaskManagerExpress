import { IUserToken, ResponseFormatted } from '~/utils/types'

declare module 'express' {
    export interface Response {
        locals: {
            responseData?: ResponseFormatted
        }
    }
    export interface Request {
        user?: IUserToken
    }
}

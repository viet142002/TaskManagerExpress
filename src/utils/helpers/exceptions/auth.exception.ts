import { ERR_CODE } from '~/utils/constants'
import { httpExceptions } from '~/utils/helpers/exceptions/httpException'

export const authException = {
    userNotFound: (email: string) => {
        return httpExceptions.badRequest(ERR_CODE.USER_NOT_FOUND, `User ${email} not found`)
    },
    userExisted: (email: string) => {
        return httpExceptions.badRequest(ERR_CODE.USER_NOT_FOUND, `User ${email} had registered`)
    },
    passwordInvalid: () => {
        return httpExceptions.badRequest(ERR_CODE.PASSWORD_ID_CORRECT, `Password is invalid`)
    },
    forbidden: () => {
        return httpExceptions.badRequest(ERR_CODE.FORBIDDEN, `You not access`)
    }
}

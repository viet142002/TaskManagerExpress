import { ERR_CODE } from '~/utils/constants'
import { httpExceptions } from '~/utils/helpers/exceptions/httpException'

export const commonException = {
    inputInvalid: (msg: string) => httpExceptions.badRequest(ERR_CODE.INVALID_INPUT, msg),
    notFound: (msg: string) => httpExceptions.notFound(ERR_CODE.NOT_FOUND_API, msg),
    badRequest: (msg: string) => httpExceptions.badRequest(ERR_CODE.BAD_REQUEST, msg)
}

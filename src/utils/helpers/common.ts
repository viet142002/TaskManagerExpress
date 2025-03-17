import { Request } from 'express'
import { authException } from '~/utils/helpers/exceptions'

export const getUserFromReq = (req: Request) => {
    const user = req?.user
    if (!user) {
        throw authException.forbidden()
    }
    return user
}

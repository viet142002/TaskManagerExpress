import jwt from 'jsonwebtoken'

import { wrapperMiddle } from '~/utils/helpers/common'
import { authException } from '~/utils/helpers/exceptions'
import { IUserToken } from '~/utils/types'

const SECRET_KEY = process.env.SECRET_KEY as string

// Phân quyền người dùng
export const authentication = wrapperMiddle((req, res, next) => {
    const cookies = req.cookies
    const accessToken = cookies?.['accessToken']

    if (accessToken) {
        try {
            const user = jwt.verify(accessToken, SECRET_KEY)
            req.user = user as IUserToken
        } catch (e) {
            next(authException.forbidden())
        }
    } else {
        next(authException.forbidden())
    }
    next()
})

// Xác thực người dùng
export const authorization = wrapperMiddle((req, res, next) => {
    next()
})

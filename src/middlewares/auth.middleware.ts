import { NextFunction, Request, Response } from 'express'
import jwt, { VerifyErrors } from 'jsonwebtoken'

import { authException } from '~/utils/helpers/exceptions'
import { IUserToken } from '~/utils/types'

const SECRET_KEY = process.env.SECRET_KEY as string

// Phân quyền người dùng
export const authentication = (req: Request, res: Response, next: NextFunction) => {
    const cookies = req.cookies
    const accessToken = cookies?.['accessToken']
    if (accessToken) {
        try {
            jwt.verify(accessToken, SECRET_KEY, (err: VerifyErrors | null, decoded?: object | string) => {
                if (err) {
                    console.log('token expired', err)
                    next(authException.expiredToken())
                } else {
                    req.user = decoded as IUserToken
                    next()
                }
            })
        } catch (e) {
            next(e)
        }
    } else {
        next(authException.forbidden())
    }
}

// Xác thực người dùng
export const authorization = (req: Request, res: Response, next: NextFunction) => {
    const cookies = req.cookies
    const accessToken = cookies?.['accessToken']
    console.log('accessToken', accessToken)

    if (accessToken) {
        try {
            jwt.verify(accessToken, SECRET_KEY, (err: VerifyErrors | null, decoded?: object | string) => {
                if (err) {
                    console.log('token expired', err)
                    next(authException.expiredToken())
                } else {
                    req.user = decoded as IUserToken
                    next()
                }
            })
        } catch (e) {
            next(e)
        }
    } else {
        next(authException.forbidden())
    }
}

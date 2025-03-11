import e, { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'

import { userService } from '~/services/user.service'
import { userProfileService } from '~/services/userProfile.service'
import { hashData } from '~/utils/helpers/bcrypt'
import { authException } from '~/utils/helpers/exceptions'
import { generateAccessToken, generateRefreshToken } from '~/utils/helpers/jsonwebtoken'
import { ACCESS_TOKEN_EXPIRED, REFRESH_TOKEN_EXPIRED } from '~/utils/constants'
import { wrapperController } from '~/utils/helpers/common'

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, fullname } = req.body
    const isExistUser = await userService.getUser({ email })

    if (isExistUser) {
        return next(authException.userExisted(email))
    }

    const hashPassword = await hashData(password)

    const user = await userService.addUser({
        email,
        password: hashPassword,
        name: fullname
    })

    await userProfileService.addProfile({
        user: {
            connect: { id: user.id }
        },
        avatar: ''
    })

    res.locals.responseData = {
        status: 201,
        data: user,
        isList: false,
        message: 'Register success'
    }
    return next()
}

export const login = wrapperController(async (req, res, next, sendRes) => {
    const { email, password } = req.body
    const user = await userService.getUser({
        email
    })

    if (!user) {
        return next(authException.userNotFound(email))
    }

    const matchPass = await bcrypt.compare(password, user.password)

    if (!matchPass) {
        return next(authException.passwordInvalid())
    }

    const accessToken = await generateAccessToken({
        id: user.id,
        name: user.name,
        email: user.email
    })
    const refreshToken = await generateRefreshToken({
        id: user.id,
        name: user.name,
        email: user.email
    })

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: ACCESS_TOKEN_EXPIRED
    })

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/api/v1/auth/refresh-token',
        maxAge: REFRESH_TOKEN_EXPIRED
    })

    sendRes({
        status: 200,
        message: 'Login success',
        data: {
            id: user.id,
            name: user.name,
            email: user.email
        },
        isList: false
    })
})

import bcrypt from 'bcrypt'

import { userService } from '~/services/user.service'
import { userProfileService } from '~/services/userProfile.service'
import { hashData } from '~/utils/helpers/bcrypt'
import { authException } from '~/utils/helpers/exceptions'
import { generateAccessToken, generateRefreshToken } from '~/utils/helpers/jsonwebtoken'
import { ACCESS_TOKEN_EXPIRED, REFRESH_TOKEN_EXPIRED } from '~/utils/constants'
import { prisma } from '~/configs/prisma'
import { NextFunction, Request, Response } from 'express'

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, fullname } = req.body
        const isExistUser = await userService.getUser({ email })

        if (isExistUser) {
            return next(authException.userExisted(email))
        }

        const hashPassword = await hashData(password)

        const user = await prisma.$transaction(async (tx) => {
            const user = await userService.addUser({
                data: {
                    email,
                    password: hashPassword,
                    name: fullname
                },
                tx
            })
            await userProfileService.addProfile({
                tx,
                data: {
                    user: {
                        connect: { id: user.id }
                    },
                    avatar: ''
                }
            })
            return user
        })

        res.locals.responseData = {
            status: 201,
            data: user,
            isList: false,
            message: 'Register success'
        }
        next()
    } catch (error) {
        next(error)
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
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

        res.locals.responseData = {
            status: 200,
            message: 'Login success',
            data: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            isList: false
        }
        next()
    } catch (error) {
        next(error)
    }
}

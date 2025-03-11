import jwt from 'jsonwebtoken'
import { ACCESS_TOKEN_EXPIRED, REFRESH_TOKEN_EXPIRED } from '~/utils/constants'

const SECRET_KEY = process.env.SECRET_KEY as string

export const generateToken = async (data: string | Buffer | object, expired: number) => {
    const token = await jwt.sign(data, SECRET_KEY, {
        expiresIn: expired
    })
    return token
}

export const generateAccessToken = (data: string | Buffer | object) => {
    return generateToken(data, ACCESS_TOKEN_EXPIRED)
}

export const generateRefreshToken = (data: string | Buffer | object) => {
    return generateToken(data, REFRESH_TOKEN_EXPIRED)
}

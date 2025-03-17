import { Prisma, PrismaClient } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/react-native.js'

interface ISingleResponse {
    isList: false
    data: unknown
    status: number
    message: string
}

interface IListResponse {
    isList: true
    data: Array<unknown>
    status: number
    message: string
    pagination: {
        page: number
        limit: number
        totalPages: number
    }
}

export type ResponseFormatted = IListResponse | ISingleResponse

export interface IUserToken {
    id: number
    name: string
    email: string
}

export type PrismaTransactionParam = Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>
export interface ServiceCreateParams<T> {
    data: T
    tx?: PrismaTransactionParam
}
export interface ServiceUpdateParams<T, K> {
    data: T
    queries: K
    tx?: PrismaTransactionParam
}

export type PrimaInstance = PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>

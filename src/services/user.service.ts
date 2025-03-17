import { PrismaClient, Prisma } from '@prisma/client'

import { ServiceCreateParams } from '~/utils/types'

class UserService {
    private prisma: PrismaClient
    constructor() {
        this.prisma = new PrismaClient()
    }
    getUsers(props: Prisma.UserWhereInput) {
        return this.prisma.user.findMany({
            where: props,
            select: {
                id: true,
                email: true,
                name: true
            }
        })
    }
    getUser(props: Prisma.UserWhereUniqueInput) {
        return this.prisma.user.findUnique({
            where: props,
            select: {
                id: true,
                email: true,
                name: true,
                password: true
            }
        })
    }
    async addUser(props: ServiceCreateParams<Prisma.UserCreateInput>) {
        const prisma = props?.tx || this.prisma
        const { password, ...data } = await prisma.user.create({
            data: props.data
        })
        return data
    }
    async updateUser(id: number, userUpdateData: Prisma.UserUpdateInput) {
        const { password, ...data } = await this.prisma.user.update({
            where: { id },
            data: userUpdateData
        })
        return data
    }
}

export const userService = new UserService()

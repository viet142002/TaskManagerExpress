import { PrismaClient, Prisma } from '@prisma/client'

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
                name: true
            }
        })
    }
    async addUser(userCreateData: Prisma.UserCreateInput) {
        const { password, ...data } = await this.prisma.user.create({
            data: userCreateData
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

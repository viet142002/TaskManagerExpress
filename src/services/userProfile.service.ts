import { PrismaClient, Prisma } from '@prisma/client'
import { ServiceCreateParams } from '~/utils/types'

class UserProfileService {
    private prisma: PrismaClient
    constructor() {
        this.prisma = new PrismaClient()
    }
    async getProfile(props: Prisma.UserProfileWhereInput) {
        return this.prisma.userProfile.findMany({
            where: props,
            select: {
                id: true,
                avatar: true
            }
        })
    }
    async addProfile(props: ServiceCreateParams<Prisma.UserProfileCreateInput>) {
        const prisma = props?.tx || this.prisma
        const data = await prisma.userProfile.create({
            data: props.data
        })
        return data
    }
    async updateUser(id: number, profileUpdateData: Prisma.UserProfileUpdateInput) {
        const data = await this.prisma.userProfile.update({
            where: { id },
            data: profileUpdateData
        })
        return data
    }
}

export const userProfileService = new UserProfileService()

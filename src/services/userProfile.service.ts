import { PrismaClient, Prisma } from '@prisma/client'

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
    async addProfile(profileData: Prisma.UserProfileCreateInput) {
        const data = await this.prisma.userProfile.create({
            data: profileData
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

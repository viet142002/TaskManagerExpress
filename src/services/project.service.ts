import { PrismaClient, Prisma } from '@prisma/client'

import { ServiceCreateParams, ServiceUpdateParams } from '~/utils/types'

class ProjectService {
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
    async createProject(props: ServiceCreateParams<Prisma.ProjectCreateInput>) {
        const prisma = props.tx || this.prisma
        const project = await prisma.project.create({
            data: props.data
        })
        return project
    }
    async updateProject(props: ServiceUpdateParams<Prisma.ProjectUpdateInput, Prisma.ProjectWhereUniqueInput>) {
        const prisma = props.tx || this.prisma
        const project = await prisma.project.update({
            where: props.queries,
            data: props.data
        })
        return project
    }
}

export const projectService = new ProjectService()

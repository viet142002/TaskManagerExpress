import { PrismaClient, Prisma } from '@prisma/client'
import { ServiceCreateParams, ServiceUpdateParams } from '~/utils/types'

class StatusService {
    private prisma: PrismaClient
    constructor() {
        this.prisma = new PrismaClient()
    }
    getStatuses(props: Prisma.StatusWhereInput) {
        return this.prisma.status.findMany({
            where: props
        })
    }
    getStatus(props: Prisma.StatusWhereUniqueInput) {
        return this.prisma.status.findUnique({
            where: props
        })
    }
    async createStatus(props: ServiceCreateParams<Prisma.StatusCreateInput>) {
        const prisma = props.tx || this.prisma
        const status = await prisma.status.create({
            data: props.data
        })
        return status
    }
    async updateStatus(props: ServiceUpdateParams<Prisma.StatusUpdateInput, Prisma.StatusWhereUniqueInput>) {
        const prisma = props.tx || this.prisma
        const status = await prisma.status.update({
            where: props.queries,
            data: props.data
        })
        return status
    }
}

export const statusService = new StatusService()

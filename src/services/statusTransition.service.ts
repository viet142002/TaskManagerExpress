import { PrismaClient, Prisma } from '@prisma/client'
import { ServiceCreateParams, ServiceUpdateParams } from '~/utils/types'

class StatusTransactionService {
    private prisma: PrismaClient
    constructor() {
        this.prisma = new PrismaClient()
    }
    getAllStatusTrans(props: Prisma.StatusTransitionWhereInput) {
        return this.prisma.statusTransition.findMany({
            where: props
        })
    }
    getStatusTrans(props: Prisma.StatusTransitionWhereUniqueInput) {
        return this.prisma.statusTransition.findUnique({
            where: props
        })
    }
    async createStatusTrans(props: ServiceCreateParams<Prisma.StatusTransitionCreateInput>) {
        const prisma = props.tx || this.prisma
        const status = await prisma.statusTransition.create({
            data: props.data
        })
        return status
    }
    async updateStatusTrans(props: ServiceUpdateParams<Prisma.StatusTransitionUpdateInput, Prisma.StatusTransitionWhereUniqueInput>) {
        const prisma = props.tx || this.prisma
        const status = await prisma.statusTransition.update({
            where: props.queries,
            data: props.data
        })
        return status
    }
}

export const statusTransService = new StatusTransactionService()

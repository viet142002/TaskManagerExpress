import { NextFunction, Request, Response } from 'express'
import { prisma } from '~/configs/prisma'
import { statusTransService } from '~/services'

export const getAllStatusTrans = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.locals.responseData = {
            status: 200,
            data: null,
            isList: false,
            message: 'Get all status transition success'
        }
        next()
    } catch (error) {
        next(error)
    }
}

export const getStatusTrans = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.locals.responseData = {
            status: 200,
            data: null,
            isList: false,
            message: 'Get status transition success'
        }
        next()
    } catch (error) {
        next(error)
    }
}

export const updateStatusTrans = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const statusTransId = req.params.id
        const project = await prisma.$transaction(async (tx) => {
            const pro = await statusTransService.updateStatusTrans({
                data: req.body,
                tx,
                queries: {
                    id: +statusTransId
                }
            })
            return pro
        })

        res.locals.responseData = {
            status: 200,
            data: project,
            isList: false,
            message: 'Update status transition success'
        }
        next()
    } catch (error) {
        next(error)
    }
}

export const createStatusTrans = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const project = await statusTransService.createStatusTrans({
            data: req.body
        })
        res.locals.responseData = {
            status: 201,
            data: project,
            isList: false,
            message: 'Create status transition success'
        }
        next()
    } catch (error) {
        next(error)
    }
}

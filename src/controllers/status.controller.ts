import { NextFunction, Request, Response } from 'express'
import { prisma } from '~/configs/prisma'
import { statusService } from '~/services'

export const getAllStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.locals.responseData = {
            status: 200,
            data: null,
            isList: false,
            message: 'Get all status success'
        }
        next()
    } catch (error) {
        next(error)
    }
}

export const getStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.locals.responseData = {
            status: 200,
            data: null,
            isList: false,
            message: 'Get status success'
        }
        next()
    } catch (error) {
        next(error)
    }
}

export const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const projectId = req.params.id
        const project = await prisma.$transaction(async (tx) => {
            const pro = await statusService.updateStatus({
                data: {
                    ...req.body
                },
                tx,
                queries: {
                    id: +projectId
                }
            })
            return pro
        })

        res.locals.responseData = {
            status: 200,
            data: project,
            isList: false,
            message: 'Update status success'
        }
        next()
    } catch (error) {
        next(error)
    }
}

export const createStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const project = await statusService.createStatus({
            data: req.body
        })
        res.locals.responseData = {
            status: 201,
            data: project,
            isList: false,
            message: 'Create status success'
        }
        next()
    } catch (error) {
        next(error)
    }
}

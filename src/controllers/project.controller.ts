import { NextFunction, Request, Response } from 'express'
import { getUserFromReq } from './../utils/helpers/common'
import { prisma } from '~/configs/prisma'
import { projectService } from '~/services'

export const getAllProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.locals.responseData = {
            status: 200,
            data: null,
            isList: false,
            message: 'Get project success'
        }
        next()
    } catch (error) {
        next(error)
    }
}

export const getProjectDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.locals.responseData = {
            status: 200,
            data: null,
            isList: false,
            message: 'Update project success'
        }
        next()
    } catch (error) {
        next(error)
    }
}

export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const projectId = req.params.id
        const project = await prisma.$transaction(async (tx) => {
            const pro = await projectService.updateProject({
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
            message: 'Update project success'
        }
        next()
    } catch (error) {
        next(error)
    }
}

export const createProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = getUserFromReq(req)
        const project = await projectService.createProject({
            data: {
                creator: {
                    connect: {
                        id: user.id
                    }
                },
                ...req.body
            }
        })
        res.locals.responseData = {
            status: 201,
            data: project,
            isList: false,
            message: 'Create project success'
        }
        next()
    } catch (error) {
        next(error)
    }
}

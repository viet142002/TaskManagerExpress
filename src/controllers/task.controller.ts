import { NextFunction, Request, Response } from 'express'

export const getAllTask = async (req: Request, res: Response, next: NextFunction) => {
    res.locals.responseData = {
        status: 200,
        data: null,
        isList: false,
        message: 'Update project success'
    }
    next()
}

export const getTaskDetail = async (req: Request, res: Response, next: NextFunction) => {
    res.locals.responseData = {
        status: 200,
        data: null,
        isList: false,
        message: 'Update project success'
    }
    next()
}

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
    res.locals.responseData = {
        status: 200,
        data: null,
        isList: false,
        message: 'Update project success'
    }
    next()
}

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
    res.locals.responseData = {
        status: 200,
        data: null,
        isList: false,
        message: 'Update project success'
    }
    next()
}

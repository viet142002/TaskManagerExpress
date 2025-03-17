import { NextFunction, Request, Response, Router } from 'express'

import { authorization } from '~/middlewares/auth.middleware'
import { socketNotify } from '~/sockets/notification.socket'

import authRoute from './auth.route'
import projectRoute from './project.route'
import taskRoute from './task.route'
import status from './status.route'
import statusTrans from './statusTrans.route'

const router = Router()

router.use('/auth', authRoute)
router.use('/projects', authorization, projectRoute)
router.use('/tasks', authorization, taskRoute)
router.use('/statuses', authorization, status)
router.use('/status-trans', authorization, statusTrans)

router.post('/send-noti', (req: Request, res: Response, next: NextFunction) => {
    socketNotify.sendNoti(1, {
        message: req.body.message,
        navigate: req.body.navigate,
        type: req.body.type
    })
    res.locals.responseData = {
        status: 200,
        data: null,
        isList: false,
        message: 'Update project success'
    }
    next()
})
export default router

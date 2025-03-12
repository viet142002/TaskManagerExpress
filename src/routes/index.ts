import { Router } from 'express'

import authRoute from './auth.route'
import { authentication } from '~/middlewares/auth.middeware'
import { wrapperController } from '~/utils/helpers/common'
import { socketNotify } from '~/sockets/notification.socket'

const router = Router()

router.use('/auth', authRoute)
router.use(
    '/hello-world',
    authentication,
    wrapperController((req, res, next, send) => {
        send({
            data: req?.user,
            isList: false,
            message: 'hello world',
            status: 200
        })
    })
)

router.post(
    '/send-noti',
    wrapperController((req, res, nex, send) => {
        socketNotify.sendNoti(1, {
            message: req.body.message,
            navigate: req.body.navigate,
            type: req.body.type
        })
        send({
            data: null,
            isList: false,
            message: 'Send noty success',
            status: 200
        })
    })
)
export default router

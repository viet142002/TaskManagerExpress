import { Router } from 'express'

import authRoute from './auth.route'
import { authentication } from '~/middlewares/auth.middeware'
import { wrapperController } from '~/utils/helpers/common'

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

export default router

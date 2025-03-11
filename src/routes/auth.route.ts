import { Router } from 'express'
import { login, register } from '~/controllers/auth.controller'
import { validationHandler } from '~/middlewares/validateHandler.middleware'
import { validateAuth } from '~/utils/validator'

const router = Router()

router.post('/register', validateAuth.register, validationHandler, register)
router.post('/login', validateAuth.login, validationHandler, login)
router.post('/refresh-token', validateAuth.login, validationHandler, login)

export default router

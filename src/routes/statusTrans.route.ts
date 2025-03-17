import { Router } from 'express'

import { createStatusTrans, updateStatusTrans, getAllStatusTrans, getStatusTrans } from '~/controllers/statusTrans.controller'
import { validationHandler } from '~/middlewares/validateHandler.middleware'
import { validateProject } from '~/utils/validator/project.validator'

const router = Router()

router.post('/', validateProject.create, validationHandler, createStatusTrans)
router.get('/', getAllStatusTrans)
router.get('/:id', getStatusTrans)
router.patch('/:id', updateStatusTrans)

export default router

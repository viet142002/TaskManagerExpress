import { Router } from 'express'

import { createStatus, updateStatus, getAllStatus, getStatus } from '~/controllers/status.controller'
import { validationHandler } from '~/middlewares/validateHandler.middleware'
import { validateProject } from '~/utils/validator/project.validator'

const router = Router()

router.post('/', validateProject.create, validationHandler, createStatus)
router.get('/', getAllStatus)
router.get('/:id', getStatus)
router.patch('/:id', updateStatus)

export default router

import { Router } from 'express'

import { createProject, getAllProject, getProjectDetail, updateProject } from '~/controllers/project.controller'
import { validationHandler } from '~/middlewares/validateHandler.middleware'
import { validateProject } from '~/utils/validator/project.validator'

const router = Router()

router.post('/', validateProject.create, validationHandler, createProject)
router.get('/', getAllProject)
router.get('/:id', getProjectDetail)
router.patch('/:id', updateProject)

export default router

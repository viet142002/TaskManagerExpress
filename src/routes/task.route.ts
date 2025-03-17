import { Router } from 'express'
import { createTask, getAllTask, getTaskDetail, updateTask } from '~/controllers/task.controller'

const router = Router()

router.post('/', createTask)
router.get('/', getAllTask)
router.get('/:id', getTaskDetail)
router.patch('/:id', updateTask)

export default router

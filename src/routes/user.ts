import { Router } from 'express'
import userController from '../controllers/user'

const router = Router()

router.get('/', userController.index)
router.get('/:_id', userController.show)
router.patch('/:_id', userController.update)
router.post('/', userController.create)
router.delete('/:_id', userController.delete)


export default router

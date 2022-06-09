import { Router } from 'express'
import userController from '../controllers/user'

const UserRouter = Router()

UserRouter.get('/', userController.index)
UserRouter.get('/:_id', userController.show)
UserRouter.patch('/:_id', userController.update)
UserRouter.post('/', userController.create)
UserRouter.delete('/:_id', userController.delete)


export default UserRouter

import { Router } from 'express'
import unauthController from '../controllers/unauth'
import userController from '../controllers/user'

const router = Router()

router.post('/request-account', unauthController.requestCreation)
router.post('/register', userController.create)
router.post('/login', unauthController.login)
router.get('/feed', unauthController.feed)


export default router

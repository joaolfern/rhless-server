import { Router } from 'express'
import unauthController from '../controllers/unauth'

const router = Router()

router.post('/request-account', unauthController.requestCreation)
router.post('/login', unauthController.login)
router.get('/feed', unauthController.feed)


export default router

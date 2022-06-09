import { Router } from 'express'
import jobController from '../controllers/job'

const JobRouter = Router()

JobRouter.get('/', jobController.index)
JobRouter.get('/:_id', jobController.show)
JobRouter.patch('/:_id', jobController.update)
JobRouter.patch('/:_id/status', jobController.status)
JobRouter.post('/', jobController.create)
JobRouter.delete('/:_id', jobController.delete)


export default JobRouter

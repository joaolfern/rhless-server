import { Router } from 'express'
import candidateController from '../controllers/candidate'

const CandidateRouter = Router()

CandidateRouter.get('/', candidateController.index)
CandidateRouter.get('/:_id', candidateController.show)
CandidateRouter.patch('/:_id', candidateController.update)
CandidateRouter.patch('/:_id/status', candidateController.status)
CandidateRouter.patch('/:job/reprove', candidateController.massReprove)
CandidateRouter.post('/', candidateController.create)
CandidateRouter.delete('/:_id', candidateController.delete)


export default CandidateRouter

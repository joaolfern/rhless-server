import { Response, Request } from 'express'
import { PaginateResult } from 'mongoose'
import CandidateModel from '../models/candidate'
import jobController from '../controllers/job'
import { AuthRequest, ICandidate } from '../types'
import candidateValidation from '../validations/candidate'

export default {
  index: async (req: AuthRequest, res: Response<PaginateResult<ICandidate & Document>>) => {
    const { search, ...query } = req.query

    const params: {[key in keyof ICandidate]?: any} = {
      ...(search ? { job: { $regex: search, $options: 'i' } } : {}),
    }

    // if (req.headers['user-type'] === 'headhunter') params.author = req?.user?._id

    try {
      const jobs = await CandidateModel.paginate(
        {
          ...params
        },
        {
          ...query,
          populate: [
            { path: 'user' },
            { path: 'job', populate: { path: 'author' } },
          ],
          sort: { createdAt: -1 }
        }
      ) as PaginateResult<ICandidate & Document>

      res.status(200).json(jobs)
    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }
  },
  show: async (req: Request, res: Response<ICandidate>) => {
    const { _id } = req.params
    try {
      const user = await CandidateModel.findById(_id)
      res.status(200).json(user)
    } catch (err) {
      res.status(400).json(err)
    }
  },
  create: async (req: Request, res: Response<string>) => {
    const { status, ...data } = req.body

    const { error } = candidateValidation.create(req, res)
    if (error) return res.status(401).json(error.details[0].message)

    const Job = new CandidateModel({
      ...data,
      status: status || 'pending',
    })

    try {
      await Job.save()
      res.status(200).json('Candidatura realizada com sucesso!')
    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }
  },
  update: async (req: Request, res: Response<string>) => {
    const data = req.body
    const { _id } = req.params

    const { error } = candidateValidation.update(req, res)
    if (error) return res.status(401).json(error.details[0].message)


    try {
      await CandidateModel.updateOne(
        { _id },
        data
      )

      res.json(`Candidatura atualizada com sucesso!`)
    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }
  },
  massReprove: async (req: Request, res: Response<string>) => {
    const { error } = candidateValidation.update(req, res)
    if (error) return res.status(401).json(error.details[0].message)

    const { job } = req.params
    const { hiredCandidate } = req.body

    try {
      await CandidateModel.updateMany(
        { job, user: { $ne: hiredCandidate } },
        {
          status: 'reproved'
        }
      )

      res.json(`Candidatura atualizada com sucesso!`)
    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }
  },
  status: async (req: Request, res: Response<string>) => {
    const data = req.body
    const { _id } = req.params

    try {
      await CandidateModel.updateOne(
        { _id },
        data
      )

      res.json('Status da candidatura atualizado com sucesso!')
    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }
  },
  delete: async (req: Request, res: Response<string>) => {
    const { _id } = req.params
    try {
      await CandidateModel.deleteOne({ _id })

      res.json(`Candidatura deletada com sucesso!`)
    } catch (err) {
      res.status(400).json(err)
    }
  }
}
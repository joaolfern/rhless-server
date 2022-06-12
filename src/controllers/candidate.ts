import { Response, Request } from 'express'
import { PaginateResult } from 'mongoose'
import { AuthRequest, ICandidate, IJob } from '../types'
import candidateValidation from '../validations/candidate'
import dayjs from 'dayjs'
import JobModel from '../models/job'

export default {
  index: async (req: AuthRequest, res: Response<PaginateResult<ICandidate & Document>>) => {
    const { search, ...query } = req.query

    const params: {[key in keyof IJob]?: any} = {
      ...(search ? { name: { $regex: search, $options: 'i' } } : {}),
    }


    try {
      const jobs = await JobModel.paginate(
        {
          ...params,
          candidates: { $exists: true, $ne: [] }
        },
        {
          ...query,
          populate: [
            { path: 'author' },
            { path: 'candidates.user' },
          ],
          sort: { createdAt: -1 }
        }
      ) as PaginateResult<IJob & Document>

      const candidates: PaginateResult<ICandidate & Document> = {
        ...jobs,
        // @ts-ignore
        docs: Object.values(jobs.docs.map(job => ({...job.candidates, job: job._id }))?.filter(item => item?.user?._id)[0])
      }

      console.log(Object.values(jobs.docs.map(job => ({...job.candidates, job: job._id }))[0]))

      res.status(200).json(candidates)
    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }
  },
  show: async (req: Request, res: Response<ICandidate>) => {
    // const { _id } = req.params
    // try {
    //   const user = await CandidateModel.findById(_id)
    //   res.status(200).json(user)
    // } catch (err) {
    //   res.status(400).json(err)
    // }
  },
  create: async (req: Request, res: Response<string>) => {
    const { status, user, job, ...data } = req.body

    const { error } = candidateValidation.create(req, res)
    if (error) return res.status(401).json(error.details[0].message)

    try {
      await JobModel.updateOne(
        { _id: job },
        {
          $push: {
            candidates: {
              status: status || 'pending',
              user,
              createdAt: new Date(dayjs().format()),
            }
          }
        }
      )
      res.status(200).json('Candidatura realizada com sucesso!')
    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }
  },
  update: async (req: Request, res: Response<string>) => {
    // const data = req.body
    // const { _id } = req.params

    // const { error } = candidateValidation.update(req, res)
    // if (error) return res.status(401).json(error.details[0].message)


    // try {
    //   await CandidateModel.updateOne(
    //     { _id },
    //     {
    //       createdAt: new Date(dayjs().format()),
    //       ...data
    //     }
    //   )

    //   res.json(`Candidatura atualizada com sucesso!`)
    // } catch (err) {
    //   console.log(err)
    //   res.status(400).json(err)
    // }
  },
  massReprove: async (req: Request, res: Response<string>) => {
    // const { error } = candidateValidation.update(req, res)
    // if (error) return res.status(401).json(error.details[0].message)

    // const { job } = req.params
    // const { hiredCandidate } = req.body

    // try {
    //   await CandidateModel.updateMany(
    //     { job, user: { $ne: hiredCandidate } },
    //     {
    //       status: 'reproved'
    //     }
    //   )

    //   res.json(`Candidatura atualizada com sucesso!`)
    // } catch (err) {
    //   console.log(err)
    //   res.status(400).json(err)
    // }
  },
  status: async (req: Request, res: Response<string>) => {
    // const data = req.body
    // const { _id } = req.params

    // try {
    //   await CandidateModel.updateOne(
    //     { _id },
    //     data
    //   )

    //   res.json('Status da candidatura atualizado com sucesso!')
    // } catch (err) {
    //   console.log(err)
    //   res.status(400).json(err)
    // }
  },
  delete: async (req: Request, res: Response<string>) => {
    // const { _id } = req.params
    // try {
    //   await CandidateModel.deleteOne({ _id })

    //   res.json(`Candidatura deletada com sucesso!`)
    // } catch (err) {
    //   res.status(400).json(err)
    // }
  }
}
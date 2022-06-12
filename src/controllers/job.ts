import dayjs from 'dayjs'
import { Response, Request } from 'express'
import { PaginateResult } from 'mongoose'
import JobModel from '../models/job'
import { AuthRequest, IJob } from '../types'
import jobValidation from '../validations/job'

export default {
  index: async (req: AuthRequest, res: Response<PaginateResult<IJob & Document>>) => {
    const { search, ...query } = req.query

    const params: {[key in keyof IJob]?: any} = {
      ...(search ? { name: { $regex: search, $options: 'i' } } : {}),
    }

    if (req.headers['user-type'] === 'headhunter') params.author = req?.user?._id

    try {
      const jobs = await JobModel.paginate(
        {
          ...params
        },
        {
          ...query,
          populate: 'author',
          sort: { createdAt: -1 }
        }
      ) as PaginateResult<IJob & Document>

      res.status(200).json(jobs)
    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }
  },
  show: async (req: Request, res: Response<IJob>) => {
    const { _id } = req.params
    try {
      const user = await JobModel.findById(_id)
      res.status(200).json(user)
    } catch (err) {
      res.status(400).json(err)
    }
  },
  create: async (req: Request, res: Response<string>) => {
    const { status, ...data } = req.body

    const { error } = jobValidation.create(req, res)
    if (error) return res.status(401).json(error.details[0].message)

    const Job = new JobModel({
      ...data,
      createdAt: new Date(dayjs().format()),
      status: status || 'active'
    })

    try {
      await Job.save()
      res.status(200).json('Vaga cadastrada com sucesso!')
    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }
  },
  update: async (req: Request, res: Response<string>) => {
    const data = req.body
    const { _id } = req.params

    const { error } = jobValidation.update(req, res)
    if (error) return res.status(401).json(error.details[0].message)

    try {
      await JobModel.updateOne(
        { _id },
        {
          createdAt: new Date(dayjs().format()),
          ...data
        }
      )

      res.json(`Vaga atualizada com sucesso!`)
    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }
  },
  status: async (req: Request, res: Response<string>) => {
    const data = req.body
    const { _id } = req.params

    try {
      await JobModel.updateOne(
        { _id },
        data
      )

      res.json(`Status da vaga atualizado com sucesso!`)
    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }
  },
  delete: async (req: Request, res: Response<string>) => {
    const { _id } = req.params
    try {
      await JobModel.deleteOne({ _id })

      res.json(`Vaga deletada com sucesso!`)
    } catch (err) {
      res.status(400).json(err)
    }
  }
}
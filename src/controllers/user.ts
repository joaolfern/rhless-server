import { Request, Response } from 'express'
import userMocks from '../mocks/user'
import { IUser } from '../types'

type IndexResType = IUser[]

module.exports = {
  index: async (req: Request, res: Response<IndexResType>) => {
    try {
      res.send(userMocks.index)
    } catch (err) {
      res.status(400).json(err)
    }
  },
  show: async (req: Request, res: Response<IUser>) => {
    const { id } = req.params
    try {
      res.send(userMocks.show)
    } catch (err) {
      res.status(400).json(err)
    }
  },
  create: async (req: Request, res: Response<IndexResType>) => {
    const body = req.body
    try {
      res.send(userMocks.index)
    } catch (err) {
      res.status(400).json(err)
    }
  },
  update: async (req: Request, res: Response<IUser>) => {
    const { id } = req.params
    try {
      res.send(userMocks.update)
    } catch (err) {
      res.status(400).json(err)
    }
  },
  delete: async (req: Request, res: Response<IUser>) => {
    const { id } = req.params
    try {
      res.send(userMocks.update)
    } catch (err) {
      res.status(400).json(err)
    }
  }
}

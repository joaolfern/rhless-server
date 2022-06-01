import { Request, Response } from 'express'
import UserSchema from '../models/user'
import { IUser } from '../types'

type IndexResType = IUser[]

module.exports = {
  index: async (req: Request, res: Response<IndexResType>) => {
    try {
      const users = await UserSchema.find()
      res.status(200).json(users)
    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }
  },
  show: async (req: Request, res: Response<IUser>) => {
    const { id } = req.params
    try {
      const user = await UserSchema.findById(id)
      res.status(200).json(user)
    } catch (err) {
      res.status(400).json(err)
    }
  },
  create: async (req: Request, res: Response<string>) => {
    const body = req.body
    const User = new UserSchema(body)

    try {
      User.save()
      res.status(200).json(`Usuário cadastrado com sucesso!`)
    } catch (err) {
      res.status(400).json(err)
    }
  },
  update: async (req: Request, res: Response<string>) => {
    const { _id } = req.params
    const body = req.body
    try {
      await UserSchema.updateOne(
        { _id },
        body
      )

      res.json(`Usuário atualizado com sucesso!`)
    } catch (err) {
      res.status(400).json(err)
    }
  },
  delete: async (req: Request, res: Response<string>) => {
    const { _id } = req.params
    try {
      await UserSchema.deleteOne({ _id })

      res.json(`Usuário deletado com sucesso!`)
    } catch (err) {
      res.status(400).json(err)
    }
  }
}

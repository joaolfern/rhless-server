import { Request, Response } from 'express'
import UserSchema from '../models/user'
import { IUser } from '../types'
import bcrypt from 'bcrypt'
import userValidation from '../validations/user'
import { PaginateResult } from 'mongoose'

export default {
  index: async (req: Request, res: Response<PaginateResult<IUser & Document>>) => {
    const { query } = req

    console.log(query)
    try {
      const users = await UserSchema.paginate({}, query) as PaginateResult<IUser & Document>
      res.status(200).json(users)
    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }
  },
  show: async (req: Request, res: Response<IUser>) => {
    const { _id } = req.params
    try {
      const user = await UserSchema.findById(_id)
      res.status(200).json(user)
    } catch (err) {
      res.status(400).json(err)
    }
  },
  create: async (req: Request, res: Response<string>) => {
    const { password, confirmPassword, status, email, ...data } = req.body

    const { error } = userValidation.create(req, res)
    if (error) return res.status(401).json(error.details[0].message)

    const hasMatchingPasswords = password === confirmPassword
    if (!hasMatchingPasswords) return res.status(402).json('Senhas não coincidem')

    const hasAlreadyUsedEmail = await UserSchema.findOne({ email })
    if (hasAlreadyUsedEmail) return res.status(401).json('Email já cadastrado')

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const User = new UserSchema({
      ...data,
      email,
      password: hashedPassword,
      status: status || 'active'
    })

    try {
      await User.save()
      res.status(200).json('Usuário cadastrado com sucesso!')
    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }
  },
  update: async (req: Request, res: Response<string>) => {
    const { _id } = req.params
    const body = req.body || {}

    if (body.password) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(body.password, salt)

      body.password = hashedPassword
    }

    const matchingEmailUser = await UserSchema.findOne({ email: body.email })
    const hasAlreadyUsedEmail = matchingEmailUser && !matchingEmailUser._id?.equals?.(_id)
    if (hasAlreadyUsedEmail) return res.status(401).json('Email já cadastrado')

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

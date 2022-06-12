import { Request, Response } from 'express'
import UserSchema from '../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { IJob, IUser } from '../types'
import unauthValidation from '../validations/unauth'
import { PaginateResult } from 'mongoose'
import JobModel from '../models/job'

export default {
  requestCreation: async (req: Request, res: Response<string>) => {
    const { password, confirmPassword, ...body } = req.body

    try {
      const { error } = unauthValidation.requestCreation(req, res)
      if (error) return res.status(401).json(error.details[0].message)

      const hasMatchingPasswords = password === confirmPassword
      if (!hasMatchingPasswords) return res.status(402).json('Senhas não coincidem')

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      const data = {
        ...body,
        status: 'pending',
        type: 'headhunter',
        password: hashedPassword
      }

      const User = new UserSchema(data)
      await User.save()

      res.status(200).json(`Usuário cadastrado com sucesso!`)
    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }
  },
  login: async (req: Request, res: Response<string | {
    token: string
    user: IUser
  }>) => {
    const { email, password } = req.body

    const { error } = unauthValidation.login(req, res)
    if (error) return res.status(401).json(error.details[0].message)

    try {
      const user = await UserSchema.findOne({ email })
      if (!user) return res.status(401).json('Usuário não encontrado')
      const isValidPassword = await bcrypt.compare(password, user?.password)

      if (!isValidPassword) return res.status(401).json('Senha inválida')
      if (user.status === 'pending') return res.status(401).json('Usuário ainda não foi ativado. Contate o administrador do sistema.')
      if (user.status === 'inactive') return res.status(401).json('Usuário bloqueado')

      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)

      res.status(200).json({
        token,
        user
      })

    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }
  },
  feed: async (req: Request, res: Response<PaginateResult<IJob & Document>>) => {
    const { search, ...query } = req.query

    const params: {[key in keyof IJob]?: any} = {
      status: 'active',
      ...(search ? { name: { $regex: search, $options: 'i' } } : {}),
    }

    try {
      const jobs = await JobModel.paginate(
        params,
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
}

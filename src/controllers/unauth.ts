import { Request, Response } from 'express'
import UserSchema from '../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { IUser } from '../types'

export default {
  requestCreation: async (req: Request, res: Response<string>) => {
    const {password, ...body} = req.body

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const data = {
      ...body,
      status: 'pending',
      type: 'headhunter',
      password: hashedPassword
    }
    const User = new UserSchema(data)

    try {
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

    try {
      const user = await UserSchema.findOne({ email })
      const isValidPassword = await bcrypt.compare(password, user.password)

      if (!isValidPassword)
        return res.status(401).json('Senha inválida')

      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
      res.status(200).header('auth-token', token).json({
        token,
        user
      })

    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }
  }
}

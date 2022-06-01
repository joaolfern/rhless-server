import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import UserRouter from './routes/user'
import UnauthRouter from './routes/unauth'

import mongoose from 'mongoose'
import verify from './middlewares/verifyToken'

dotenv.config()

const app = express()

app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/unauth', UnauthRouter)
app.use('/auth/users', UserRouter)

mongoose.connect(
  process.env.DB_CONNECTION,
  {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  },
  () => console.log('Connected to DB')
)

app.listen(process.env.PORT)

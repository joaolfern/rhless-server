import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import verify from './middlewares/verifyToken'

import UserRouter from './routes/user'
import UnauthRouter from './routes/unauth'
import JobRouter from './routes/job'
import CandidateRouter from './routes/candidate'

dotenv.config()

const app = express()

app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/unauth', UnauthRouter)
app.use('/auth/users', verify, UserRouter)
app.use('/auth/jobs', verify, JobRouter)
app.use('/auth/candidates', verify, CandidateRouter)

mongoose.connect(
  process.env.DB_CONNECTION,
  {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  },
  () => console.log('Connected to DB')
)

app.listen(process.env.PORT)

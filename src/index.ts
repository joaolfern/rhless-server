const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const UserRouter = require('./routes/user')
const mongoose = require('mongoose')

dotenv.config()

const app = express()

app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/auth/users', UserRouter)

mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => console.log('Connected to DB')
)

app.listen(
  process.env.PORT,
  process.env.IP,
  console.info(`[SERVER] Listening on port ${process.env.PORT}`)
)
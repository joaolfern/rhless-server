const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const UserRouter = require('./routes/user')

dotenv.config()

const app = express()

app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/user', UserRouter)

app.listen(process.env.PORT, () => console.log('Listening on port ' + process.env.PORT))

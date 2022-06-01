import mongoose from 'mongoose'
import { IUser } from '../types'

const UserSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  picture: {
    type: String
  },
  type: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  password: {
    type: String,
    required: true
  }
})

export default mongoose.model('User', UserSchema)

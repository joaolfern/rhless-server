import paginate from 'mongoose-paginate-v2'
import mongoose, { Schema, Document } from 'mongoose'
import { DocumentPaginatedModel, IUser } from '../types'

const UserSchema: Schema = new mongoose.Schema<IUser>({
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
}).plugin(paginate)


const UserModel = mongoose.model<IUser & Document>('User', UserSchema) as DocumentPaginatedModel<IUser & Document>

export default UserModel
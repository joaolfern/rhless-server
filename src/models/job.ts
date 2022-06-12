import paginate from 'mongoose-paginate-v2'
import mongoose, { Schema, Document } from 'mongoose'
import { DocumentPaginatedModel, IJob } from '../types'

const JobSchema: Schema = new mongoose.Schema<IJob>({
  name: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  candidates: [{
    type: {
       user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'
       },
       status: {
        type: String,
        required: true
       },
       createdAt: {
        type: Date
      },
    },
  }],
  city: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date
  },
}).plugin(paginate)

const JobModel = mongoose.model<IJob & Document>('Job', JobSchema) as DocumentPaginatedModel<IJob & Document>

export default JobModel
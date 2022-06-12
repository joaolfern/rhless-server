import paginate from 'mongoose-paginate-v2'
import mongoose, { Schema, Document } from 'mongoose'
import { DocumentPaginatedModel, ICandidate } from '../types'
import dayjs from 'dayjs'

const CandidateSchema: Schema = new mongoose.Schema<ICandidate>({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Job'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  status: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date
  }
}).plugin(paginate)

const JobModel = mongoose.model<ICandidate & Document>('Candidate', CandidateSchema) as DocumentPaginatedModel<ICandidate & Document>

export default JobModel
import { Request } from 'express'
import { Document, PaginateModel } from 'mongoose'

export interface DocumentPaginatedModel<T extends Document> extends PaginateModel<T> {}


export type _userStatus = 'active' | 'inactive' | 'pending'

export type _userType = 'admin' | 'headhunter' | 'candidate'


export interface IUser extends Document {
  _id: string
  name: string
  picture: string
  email: string
  password: string
  status: _userStatus
  type: _userType
  createdAt: Date
}

export type _jobStatus = 'active' | 'inactive'
export type _jobTypes = 'intern' | 'fullTime'

export interface IJob extends Document {
  _id: string
  name: string
  type: _jobTypes
  city: string
  department: string
  description: string
  status: _jobStatus
  author: string
  createdAt: Date
}


export type AuthRequest = Request & {
  user: {
    _id: string
  }
}
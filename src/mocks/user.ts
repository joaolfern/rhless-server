import { IUser } from '../types'

const index: IUser[] = [{ _id: '1',  name: 'Arnaldo Silva', email: 'arnaldo@yopmail.com', picture: 'https://avatars2.githubusercontent.com/u/527098?s=460&v=4' }]
const show: IUser = { _id: '1', name: 'Arnaldo Silva', email: 'arnaldo@yopmail.com', picture: 'https://avatars2.githubusercontent.com/u/527098?s=460&v=4' }
const create = { }
const update: IUser = { _id: '1', name: 'Arnaldo Silva', email: 'arnaldo@yopmail.com', picture: 'https://avatars2.githubusercontent.com/u/527098?s=460&v=4' }

const userMocks = {
  index,
  show,
  create,
  update
}

export default userMocks

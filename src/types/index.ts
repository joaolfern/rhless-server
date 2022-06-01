export type _userStatus = 'active' | 'inactive'

export type _userType = 'headhunter' | 'candidate'

export type IUser = {
  _id: string
  name: string
  picture: string
  email: string
  password: string
  status: _userStatus
  type: _userType
  createdAt: Date
}

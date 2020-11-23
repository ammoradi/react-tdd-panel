export interface IUserModel {
  id: number
  email: string
  username: string
  password: string
  firstName?: string
  lastName?: string
  info?: string
  avatar?: string
  isDeleted?: boolean
}

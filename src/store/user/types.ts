import { IUserModel, IAddUserModel } from 'models/user'

export const ADD_USER: string = 'ADD_USER'
export const EDIT_USER: string = 'EDIT_USER'
export const DELETE_USER: string = 'DELETE_USER'
export const LOG_IN: string = 'LOG_IN'
export const LOG_OUT: string = 'LOG_OUT'

export interface IUserState {
  id: number
  users: IUserModel[]
}

export interface IAddUser {
  type: typeof ADD_USER
  payload: IAddUserModel
}

export interface IEditUser {
  type: typeof EDIT_USER
  payload: IUserModel
}

export interface ILogin {
  type: typeof LOG_IN
  payload: number // user id to find and login
}

export interface IDeleteUser {
  type: typeof DELETE_USER
  payload: number // user id to find and delete
}

export interface ILogout {
  type: typeof LOG_OUT
}

export type TUserActions = IAddUser & IEditUser & ILogin & IDeleteUser & ILogout

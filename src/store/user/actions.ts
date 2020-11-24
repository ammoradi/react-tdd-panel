import { IUserModel, IAddUserModel } from 'models/user'

import {
  ADD_USER,
  EDIT_USER,
  DELETE_USER,
  LOG_OUT,
  IAddUser,
  IEditUser,
  IDeleteUser,
  ILogout
} from './types'

export const addUser = (user: IUserModel): IAddUserModel => ({
  type: ADD_USER,
  payload: user
})

export const editUser = (user: IUserModel): IEditUser => ({
  type: EDIT_USER,
  payload: user
})

export const deleteUser = (userId: number): IDeleteUser => ({
  type: DELETE_USER,
  payload: userId
})

export const clearUser = (): ILogout => ({
  type: LOG_OUT
})

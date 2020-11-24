import { IUserModel, IAddUserModel } from 'models/user'

import {
  ADD_USER,
  EDIT_USER,
  DELETE_USER,
  LOG_IN,
  LOG_OUT,
  IAddUser,
  IEditUser,
  IDeleteUser,
  ILogin,
  ILogout
} from './types'

export const addUser = (user: IAddUserModel): IAddUser => ({
  type: ADD_USER,
  payload: user
})

export const editUser = (user: IUserModel): IEditUser => ({
  type: EDIT_USER,
  payload: user
})

export const login = (userId: number): ILogin => ({
  type: LOG_IN,
  payload: userId
})

export const deleteUser = (userId: number): IDeleteUser => ({
  type: DELETE_USER,
  payload: userId
})

export const logout = (): ILogout => ({
  type: LOG_OUT
})

import { Dispatch } from 'redux'

import { LOGIN_SUCCESS, LOGIN_ERROR } from 'constants/messages'
import { IUserLoginModel } from 'models/user'
import { decodeString } from 'libs/utils'

import { IState } from '../types'
import { login, logout } from './actions'

export const loginAction = (data: IUserLoginModel): any => (
  dispatch: Dispatch,
  getState: () => IState
) =>
  new Promise(async (resolve, reject) => {
    try {
      const { users } = getState().user

      const desiredUserIndex = users.findIndex(
        (user) => user.username === data.username
      )
      if (desiredUserIndex === -1) return reject(LOGIN_ERROR)

      const decodedPass: string = decodeString(users[desiredUserIndex].password)
      if (decodedPass !== data.password) return reject(LOGIN_ERROR)

      dispatch(login(users[desiredUserIndex].id))
      return resolve(LOGIN_SUCCESS)
    } catch (_) {
      return reject(LOGIN_ERROR)
    }
  })

export const logoutAction = (): any => (dispatch: Dispatch) =>
  new Promise(async (resolve) => {
    try {
      dispatch(logout())
      return resolve('resolved')
    } catch (_) {
      return resolve('err')
    }
  })

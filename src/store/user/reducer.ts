import update from 'immutability-helper'
import isEmpty from 'lodash.isempty'

import { IUserModel, IAddUserModel } from 'models/user'
import { encodeString } from 'libs/utils'

import {
  ADD_USER,
  EDIT_USER,
  DELETE_USER,
  LOG_IN,
  LOG_OUT,
  IUserState,
  TUserActions
} from './types'

const initialState: IUserState = {
  id: 0,
  users: [{ id: 0, username: 'guest', password: 'test', email: 'test@test.test' }]
}

function userReducer(state: IUserState, action: TUserActions): IUserState {
  if (typeof state === 'undefined') {
    return initialState
  }

  const { users } = state

  switch (action.type) {
    case ADD_USER: {
      const newUser: IAddUserModel = action.payload
      if (isEmpty(newUser)) return state

      const lastUserId = state.users[state.users.length - 1].id

      return {
        ...state,
        users: update(users, {
          $push: [
            {
              ...newUser,
              id: lastUserId + 1,
              password: encodeString(newUser.password)
            }
          ]
        })
      }
    }

    case EDIT_USER: {
      const newUser: IUserModel = action.payload
      if (isEmpty(newUser)) return state

      const desiredUserIndex = state.users.findIndex((user) => user.id === newUser.id)
      if (desiredUserIndex === -1) return state

      const newUsers = [...state.users]
      const currentUser = newUsers[desiredUserIndex]
      newUsers.splice(desiredUserIndex, 1, { ...currentUser, ...newUser })
      return { ...state, users: newUsers }
    }

    case DELETE_USER: {
      const desiredUserIndex = state.users.findIndex(
        (user) => user.id === action.payload
      )
      if (desiredUserIndex === -1) return state

      const currentUser = users[desiredUserIndex]

      return {
        ...state,
        users: update(users, {
          [desiredUserIndex]: { isDeleted: { $set: !currentUser.isDeleted } }
        })
      }
    }

    case LOG_IN:
      return { ...state, id: action.payload || 0 }

    case LOG_OUT:
      return { ...state, id: 0 }

    default:
      return state
  }
}

export default userReducer

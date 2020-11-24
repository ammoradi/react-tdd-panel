import isEmpty from 'lodash.isempty'

import { IUserModel, IAddUserModel } from 'models/user'

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

  switch (action.type) {
    case ADD_USER: {
      const newUser: IAddUserModel = action.payload
      if (isEmpty(newUser)) return state

      const lastUserId = state.users[state.users.length - 1].id

      const newUsers = [...state.users]
      newUsers.push({ ...newUser, id: lastUserId + 1 })
      return { ...state, users: newUsers }
    }

    case EDIT_USER: {
      const newUser: IUserModel = action.payload
      if (isEmpty(newUser)) return state

      const desiredUserIndex = state.users.findIndex((user) => user.id === newUser.id)
      if (desiredUserIndex === -1) return state

      const newUsers = [...state.users]
      newUsers[desiredUserIndex] = { ...newUsers[desiredUserIndex], ...newUser }
      return { ...state, users: newUsers }
    }

    case DELETE_USER: {
      const desiredUserIndex = state.users.findIndex(
        (user) => user.id === action.payload
      )
      if (desiredUserIndex === -1) return state

      const newUsers = [...state.users]
      newUsers.splice(desiredUserIndex, 1)
      return { ...state, users: newUsers }
    }

    case LOG_IN:
      return { ...state, id: action.payload || 0 }

    case LOG_OUT:
      return initialState

    default:
      return state
  }
}

export default userReducer

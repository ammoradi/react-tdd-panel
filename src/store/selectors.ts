import { createSelector } from 'reselect'

import { IUserModel } from 'models/user'

import { IState } from './types'

export const selectUserId = (state: IState): number => state.user.id
const selectUsers = (state: IState): IUserModel[] => state.user.users

export const usersSelector = createSelector(selectUsers, (users) =>
  users.filter((user) => !!user.id)
)

import { createSelector } from 'reselect'

import { IUserModel } from 'models/user'
import { ITodoObjectModel } from 'models/todo'

import { IState } from './types'

export const selectUserId = (state: IState): number => state.user.id
const selectUsers = (state: IState): IUserModel[] => state.user.users
const selectTodoItems = (state: IState): ITodoObjectModel[] => state.app.todoList

export const usersSelector = createSelector(selectUsers, (users) =>
  users.filter((user) => !!user.id && !user.isDeleted)
)

export const todoItemsSelector = createSelector(selectTodoItems, (items) =>
  items.filter((item) => !item.isDeleted)
)

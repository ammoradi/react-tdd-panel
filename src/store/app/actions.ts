import {
  IAddTodoItem,
  IRemoveTodoItem,
  IDoneTodoItem,
  IClearApp,
  ADD_TODO_ITEM,
  REMOVE_TODO_ITEM,
  DONE_TODO_ITEM,
  CLEAR_APP
} from './types'

export const addTodoItem = (itemTitle: string): IAddTodoItem => ({
  type: ADD_TODO_ITEM,
  payload: itemTitle
})

export const removeTodoItem = (itemId: number): IRemoveTodoItem => ({
  type: REMOVE_TODO_ITEM,
  payload: itemId
})

export const doneTodoItem = (itemId: number): IDoneTodoItem => ({
  type: DONE_TODO_ITEM,
  payload: itemId
})

export const clearApp = (): IClearApp => ({
  type: CLEAR_APP
})

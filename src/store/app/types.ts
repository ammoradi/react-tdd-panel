import { ITodoObjectModel } from 'models/todo'

export const ADD_TODO_ITEM: string = 'ADD_TODO_ITEM'
export const REMOVE_TODO_ITEM: string = 'REMOVE_TODO_ITEM'
export const DONE_TODO_ITEM: string = 'DONE_TODO_ITEM'
export const CLEAR_APP: string = 'CLEAR_APP'

export interface IAppState {
  todoList: ITodoObjectModel[]
}

export interface IAddTodoItem {
  type: typeof ADD_TODO_ITEM
  payload: string // todo item title
}

export interface IRemoveTodoItem {
  type: typeof REMOVE_TODO_ITEM
  payload: number // todo item id to find and remove
}

export interface IDoneTodoItem {
  type: typeof DONE_TODO_ITEM
  payload: number // todo item id to find and done
}

export interface IClearApp {
  type: typeof CLEAR_APP
}

export type TAppActions = IAddTodoItem & IRemoveTodoItem & IDoneTodoItem & IClearApp

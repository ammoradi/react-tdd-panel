import update from 'immutability-helper'

import {
  IAppState,
  TAppActions,
  ADD_TODO_ITEM,
  REMOVE_TODO_ITEM,
  DONE_TODO_ITEM,
  CLEAR_APP
} from './types'

const initialState: IAppState = {
  todoList: []
}

function userReducer(state: IAppState, action: TAppActions): IAppState {
  if (typeof state === 'undefined') {
    return initialState
  }

  const { todoList } = state

  switch (action.type) {
    case ADD_TODO_ITEM: {
      const newItemTitle: string = action.payload
      if (!newItemTitle) return state

      const nextItemId = state.todoList.length
        ? state.todoList[state.todoList.length - 1].id + 1
        : 1

      return {
        ...state,
        todoList: update(todoList, {
          $push: [{ id: nextItemId, title: newItemTitle, isDone: false }]
        })
      }
    }

    case REMOVE_TODO_ITEM: {
      // maybe you think DONE_TODO_ITEM and REMOVE_TODO_ITEM are 99% similar,
      // you right! but it is just template and example ;)
      const itemId: number = action.payload
      if (!itemId) return state

      const desiredItemIndex = state.todoList.findIndex((item) => item.id === itemId)
      if (desiredItemIndex === -1) return state

      const currentItem = todoList[desiredItemIndex]

      return {
        ...state,
        todoList: update(todoList, {
          [desiredItemIndex]: { isDeleted: { $set: !currentItem.isDeleted } }
        })
      }
    }

    case DONE_TODO_ITEM: {
      // maybe you think DONE_TODO_ITEM and REMOVE_TODO_ITEM are 99% similar,
      // you right! but it is just template and example ;)
      const itemId: number = action.payload
      if (!itemId) return state

      const desiredItemIndex = todoList.findIndex((item) => item.id === itemId)
      if (desiredItemIndex === -1) return state

      const currentItem = todoList[desiredItemIndex]

      return {
        ...state,
        todoList: update(todoList, {
          [desiredItemIndex]: { isDone: { $set: !currentItem.isDone } }
        })
      }
    }

    case CLEAR_APP:
      return initialState

    default:
      return state
  }
}

export default userReducer

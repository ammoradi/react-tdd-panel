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

  switch (action.type) {
    case ADD_TODO_ITEM: {
      const newItemTitle: string = action.payload
      if (!newItemTitle) return state

      const nextItemId = state.todoList.length
        ? state.todoList[state.todoList.length - 1].id + 1
        : 1

      const newItems = [...state.todoList]
      newItems.push({ id: nextItemId, title: newItemTitle, isDone: false })

      return { ...state, todoList: newItems }
    }

    case REMOVE_TODO_ITEM: {
      const deleteId: number = action.payload
      if (!deleteId) return state

      const desiredItemIndex = state.todoList.findIndex(
        (item) => item.id === deleteId
      )
      if (desiredItemIndex === -1) return state

      const newItems = [...state.todoList]
      newItems.splice(desiredItemIndex, 1)

      return { ...state, todoList: newItems }
    }

    case DONE_TODO_ITEM: {
      const doneId: number = action.payload
      if (!doneId) return state

      const desiredItemIndex = state.todoList.findIndex((item) => item.id === doneId)
      if (desiredItemIndex === -1) return state

      const newItems = [...state.todoList]
      newItems[desiredItemIndex].isDone = !state.todoList[desiredItemIndex].isDone

      return { ...state, todoList: newItems }
    }

    case CLEAR_APP:
      return initialState

    default:
      return state
  }
}

export default userReducer

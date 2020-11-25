import { IAction } from 'constants/types'

import { IGifObject, IState } from './Gifs.types'

// ACTIONS

enum ActionTypes {
  TOGGLE_LOADING = 'TOGGLE_LOADING',
  SET_QUERY = 'SET_QUERY',
  SET_PAGE = 'SET_PAGE',
  SET_GIFS = 'SET_GIFS'
}

export const toggleLoading = (): IAction => ({ type: ActionTypes.TOGGLE_LOADING })

export const setQuery = (query: string): IAction => ({
  type: ActionTypes.SET_QUERY,
  payload: query
})

export const setPage = (page: number | 'inc'): IAction => ({
  type: ActionTypes.SET_PAGE,
  payload: page
})

export const setGifs = (gifs: IGifObject[]): IAction => ({
  type: ActionTypes.SET_GIFS,
  payload: gifs
})

// REDUCER

export const initialState: IState = {
  loading: false,
  gifs: [],
  page: 1,
  query: ''
}

export function reducer(state: IState, action: IAction): IState {
  const { type, payload } = action

  switch (type) {
    case ActionTypes.TOGGLE_LOADING:
      return { ...state, loading: !state.loading }

    case ActionTypes.SET_QUERY:
      return { ...state, query: payload || '', page: 1 }

    case ActionTypes.SET_PAGE:
      return { ...state, page: (payload === 'inc' ? state.page + 1 : payload) || 1 }

    case ActionTypes.SET_GIFS: {
      const newGifs = payload || []
      return {
        ...state,
        gifs: state.page === 1 ? newGifs : [...state.gifs, ...newGifs]
      }
    }

    default:
      return initialState
  }
}

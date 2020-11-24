// import { createSelector } from 'reselect'

import { IState } from './types'

export const selectUserId = (state: IState) => state.user.id

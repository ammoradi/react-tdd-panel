// this is general action for all redux and non-redux store actions.
// it can be stricter using extensions (interface extends) on where it used
export interface IAction {
  type: any
  payload?: any
}

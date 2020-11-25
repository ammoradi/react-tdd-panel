export interface IGifObject {
  id: string
  url: string
}

export interface IState {
  loading: boolean
  gifs: IGifObject[]
  page: number
  query: string
}

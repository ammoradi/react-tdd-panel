export type TPathname =
  | '/'
  | '/login'
  | '/register'
  | '/users'
  | '/profile'
  | '/gifs'
  | 'todo'
  | string

export interface IRoute {
  key: string
  title: string
  isPrivate: boolean
}

export type TRoutes = {
  [key in TPathname]: IRoute
}

export const Routes: TRoutes = {
  '/': {
    key: 'landing',
    title: '',
    isPrivate: false
  },
  '/login': {
    key: 'login',
    title: '',
    isPrivate: false
  },
  '/register': {
    key: 'register',
    title: '',
    isPrivate: false
  },
  '/users': {
    key: 'users',
    title: 'Users',
    isPrivate: true
  },
  '/gifs': {
    key: 'gifs',
    title: 'Gifs',
    isPrivate: true
  },
  '/todo': {
    key: 'todo',
    title: 'Todo List',
    isPrivate: true
  },
  '/profile': {
    key: 'profile',
    title: 'Profile',
    isPrivate: true
  }
}

export const publicRoutesKeys: TPathname[] = Object.keys(Routes).filter(
  (key) => !Routes[key].isPrivate
)

export const privateRoutesKeys: TPathname[] = Object.keys(Routes).filter(
  (key) => Routes[key].isPrivate
)

export const privateRoutes: IRoute[] = Object.keys(Routes)
  .filter((key) => Routes[key].isPrivate)
  .map((key) => ({ ...Routes[key], key }))

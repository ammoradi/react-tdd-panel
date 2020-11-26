import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import RouteProvider from 'components/RouteProvider'

import Login from './Login'
import Register from './Register'
import Gifs from './Gifs'
import Users from './Users'
import Todo from './Todo'

function Navigation() {
  return (
    <BrowserRouter basename="/">
      <RouteProvider>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/gifs" exact>
          <Gifs />
        </Route>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Route path="/todo" exact>
          <Todo />
        </Route>
      </RouteProvider>
    </BrowserRouter>
  )
}

export default Navigation

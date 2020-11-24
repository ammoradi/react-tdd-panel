import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import PrivateRoute from 'components/PrivateRoute'

import Login from './Login'

function Navigation() {
  return (
    <BrowserRouter>
      <Switch>
        <Route restricted path="/login" exact>
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Navigation

import React from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'

// import PrivateRoute from 'components/PrivateRoute'

import Login from './Login'
import Register from './Register'

function Navigation() {
  return (
    <BrowserRouter>
      <Route restricted path="/" exact>
        <Redirect to="/login" />
      </Route>
      <Route restricted path="/login" exact>
        <Login />
      </Route>
      <Route restricted path="/register" exact>
        <Register />
      </Route>
    </BrowserRouter>
  )
}

export default Navigation

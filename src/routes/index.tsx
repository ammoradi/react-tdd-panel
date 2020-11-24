import React from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'

// import PrivateRoute from 'components/PrivateRoute'

import Login from './Login'

function Navigation() {
  return (
    <BrowserRouter>
      <Route restricted path="/" exact>
        <Redirect to="/login" />
      </Route>
      <Route restricted path="/login" exact>
        <Login />
      </Route>
    </BrowserRouter>
  )
}

export default Navigation

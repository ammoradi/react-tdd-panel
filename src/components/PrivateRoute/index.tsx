import React, { ReactNode } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectUserId } from 'store/selectors'

interface IProps {
  children: ReactNode
  path: any
  exact: boolean
}

const PrivateRoute = ({ children, path, ...rest }: IProps) => {
  const userId = useSelector(selectUserId)

  if (!userId) {
    return (
      <Route {...rest}>
        <Redirect to="/login" />
      </Route>
    )
  }

  return <Route {...rest}>{children}</Route>
}

export default PrivateRoute

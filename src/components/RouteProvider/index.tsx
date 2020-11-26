import React, { useCallback, ReactNode } from 'react'
import { Redirect, useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Layout, Typography, Button, Popconfirm, message } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'

import { publicRoutesKeys, Routes } from 'constants/router'
import { logoutAction } from 'store/user/thunks'
import { selectUserId } from 'store/selectors'
import SideBar from '../SideBar'

import {
  StyledLayout,
  StyledHeader,
  StyledContent,
  InnerContent,
  StyledFooter
} from './RouteProvider.styled'

interface IProps {
  children: ReactNode
}

const RouteProvider = ({ children }: IProps) => {
  const history = useHistory()
  const location = useLocation()
  const userId = useSelector(selectUserId)
  const dispatch = useDispatch()

  const isPublic = publicRoutesKeys.includes(location.pathname)

  const handleLogout = useCallback(() => {
    dispatch(logoutAction())
    message.info('Bye Bye :)')
    history.push('/login')
  }, [])

  if (isPublic && userId) {
    return (
      <>
        <Redirect to="/gifs" />
        {children}
      </>
    )
  }

  if (!userId) {
    return (
      <>
        <Redirect to={location.pathname === '/register' ? '/register' : '/login'} />
        {children}
      </>
    )
  }

  return (
    <StyledLayout>
      <SideBar />
      <Layout className="site-layout">
        <StyledHeader>
          <Typography.Title level={2}>
            {Routes[location.pathname]?.title}
          </Typography.Title>
          <Popconfirm
            title="Are you sure to leave?"
            onConfirm={handleLogout}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" icon={<LogoutOutlined />} />
          </Popconfirm>
        </StyledHeader>
        <StyledContent>
          <InnerContent>{children}</InnerContent>
        </StyledContent>
        <StyledFooter>
          Tdd Test Admin Panel ©2020 Created by Amirmohammad Moradi
        </StyledFooter>
      </Layout>
    </StyledLayout>
  )
}

export default RouteProvider

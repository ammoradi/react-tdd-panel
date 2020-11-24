import React, { ReactNode } from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Layout, Typography } from 'antd'

import { publicRoutesKeys, Routes } from 'constants/router'
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
  const location = useLocation()
  const userId = useSelector(selectUserId)

  const isPublic = publicRoutesKeys.includes(location.pathname)

  if (isPublic && userId) {
    return (
      <>
        <Redirect to="/gifs" />
        {children}
      </>
    )
  }

  if (isPublic) return <>{children}</>

  if (!isPublic && !userId) {
    return (
      <>
        <Redirect to="/login" />
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

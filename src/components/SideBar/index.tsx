import React, { useState, useCallback, useMemo, ReactNode } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Layout, Menu, Avatar, Typography, Tooltip } from 'antd'
import { UserOutlined, GifOutlined, CheckOutlined } from '@ant-design/icons'

import { TPathname, privateRoutes } from 'constants/router'
import { IUserModel } from 'models/user'
import { selectUserId, usersSelector } from 'store/selectors'

import { UserInfo } from './SideBar.styled'

const { Sider } = Layout

type TRoutesIcons = {
  [key in TPathname]: ReactNode
}

const RoutesIcons: TRoutesIcons = {
  '/': null,
  '/login': null,
  '/register': null,
  '/users': <UserOutlined />,
  '/gifs': <GifOutlined />,
  '/todo': <CheckOutlined />,
  '/profile': null
}

function SideBar() {
  const history = useHistory()
  const currentUserId: number = useSelector(selectUserId)
  const users: IUserModel[] = useSelector(usersSelector)
  const [collapsed, setCollapsed] = useState<boolean>(false)

  const onCollapse = useCallback((c: boolean) => {
    setCollapsed(c)
  }, [])

  const handleClickMenu = useCallback(
    (path: TPathname) => () => {
      history.push(path)
    },
    []
  )

  const currentUser = useMemo(() => users.find((user) => user.id === currentUserId), [
    currentUserId,
    users
  ])

  const goToProfile = useCallback(() => {
    history.push('/profile')
  }, [])

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <UserInfo onClick={goToProfile}>
        <Tooltip title="Click to edit your profile" placement="right">
          <Avatar
            src={currentUser?.avatar}
            icon={<UserOutlined />}
            size={collapsed ? 32 : 100}
          />
          <Typography.Title level={4}>
            {collapsed ? '' : currentUser?.username}
          </Typography.Title>
        </Tooltip>
      </UserInfo>
      <Menu
        theme="dark"
        defaultSelectedKeys={[history.location.pathname]}
        mode="inline"
      >
        {privateRoutes
          .filter((route) => !route.key.includes('profile'))
          .map((route) => (
            <Menu.Item
              key={route.key}
              icon={RoutesIcons[route.key]}
              onClick={handleClickMenu(route.key)}
            >
              {route.title}
            </Menu.Item>
          ))}
      </Menu>
    </Sider>
  )
}

export default SideBar

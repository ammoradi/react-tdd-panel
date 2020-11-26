import React, { useState, useCallback, ReactNode } from 'react'
import { useHistory } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { UserOutlined, GifOutlined, CheckOutlined } from '@ant-design/icons'

import { TPathname, privateRoutes } from 'constants/router'

import { Logo } from './SideBar.styled'

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
  '/todo': <CheckOutlined />
}

function SideBar() {
  const history = useHistory()
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

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <Logo />
      <Menu
        theme="dark"
        defaultSelectedKeys={[history.location.pathname]}
        mode="inline"
      >
        {privateRoutes.map((route) => (
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

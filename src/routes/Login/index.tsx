import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Typography, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import { IUserLoginModel } from 'models/user'
import { loginAction } from 'store/user/thunks'
import FormItem from 'components/FormItem'

import { Container, StyledForm } from './Login.styled'

const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(false)

  const onFinish = async (values: IUserLoginModel | any) => {
    try {
      setLoading(true)
      const msg: string = await dispatch(loginAction(values))
      message.success(msg)
      setLoading(false)
      history.push('/gifs')
    } catch (e) {
      message.error(e)
      setLoading(false)
    }
  }

  return (
    <Container>
      <StyledForm name="login" onFinish={onFinish}>
        <Typography.Title level={2}>Log In</Typography.Title>

        <FormItem
          name="username"
          rules={[{ required: true, message: 'Please input your Username!', min: 3 }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            size="large"
          />
        </FormItem>
        <FormItem
          name="password"
          rules={[{ required: true, message: 'Please input your Password!', min: 4 }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            size="large"
          />
        </FormItem>
        {/* <FormItem>
        <FormItem name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </FormItem>

        <a className="login-form-forgot" href="/register">
          Forgot password
        </a>
      </FormItem> */}

        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            size="large"
            loading={loading}
          >
            Log in
          </Button>
        </FormItem>
        <FormItem>
          Or <Link to="/register">register now!</Link>
        </FormItem>
      </StyledForm>
    </Container>
  )
}

export default Login

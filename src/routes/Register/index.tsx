import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Typography, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'

import { addUser } from 'store/user/actions'
import FormItem from 'components/FormItem'

import { Container, StyledForm } from './Register.styled'

interface IValues {
  username: string
  email: string
  password: string
  passwordConfirm: string
}

const Register = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(false)

  const onFinish = async (values: IValues | any) => {
    try {
      const { username, email, password, passwordConfirm } = values

      if (password !== passwordConfirm) {
        message.error("Password doesn't match password confirm!")
        return
      }

      setLoading(true)
      await dispatch(addUser({ username, password, email })) // I Know it is not async ;)
      message.success('You registered successfully. Login now!')
      setLoading(false)
      history.push('/login')
    } catch (e) {
      message.error(e)
      setLoading(false)
    }
  }

  return (
    <Container>
      <StyledForm name="register" onFinish={onFinish}>
        <Typography.Title level={2}>Register</Typography.Title>

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
          name="email"
          rules={[
            { required: true, message: 'Please input your Email!', type: 'email' }
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="email"
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
        <FormItem
          name="passwordConfirm"
          rules={[
            { required: true, message: 'Please re-enter your Password!', min: 4 }
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password confirm"
            size="large"
          />
        </FormItem>

        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="register-form-button"
            size="large"
            loading={loading}
          >
            Register
          </Button>
        </FormItem>
        <FormItem>
          Already have an account? <Link to="/login">login</Link>
        </FormItem>
      </StyledForm>
    </Container>
  )
}

export default Register

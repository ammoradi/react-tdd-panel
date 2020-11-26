import React, { useState, useCallback, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Input, Button, Upload, Avatar, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import { IUserModel, IAddUserModel } from 'models/user'
import { getBase64 } from 'libs/utils'
import { editUser } from 'store/user/actions'
import { selectUserId, usersSelector } from 'store/selectors'
import FormItem from 'components/FormItem'

import { Container, Content } from './Profile.styled'

function SideBar() {
  const currentUserId: number = useSelector(selectUserId)
  const users: IUserModel[] = useSelector(usersSelector)
  const dispatch = useDispatch()
  const [imageUrl, setImageUrl] = useState<string>('')

  const currentUser = useMemo(() => users.find((user) => user.id === currentUserId), [
    currentUserId
  ])

  const handleSubmit = useCallback(
    (values: IAddUserModel) => {
      dispatch(
        editUser({
          id: currentUserId,
          ...currentUser,
          ...values,
          avatar: imageUrl || currentUser?.avatar
        })
      )
      message.success('Your profile updated successfully.')
    },
    [imageUrl]
  )

  const handleChange = (info: any) => {
    getBase64(info.file.originFileObj, (url: string) => setImageUrl(url))
  }

  return (
    <Container>
      <Content>
        <Upload
          listType="picture-card"
          onChange={handleChange}
          showUploadList={false}
          accept=".png,.jpg,.gif"
        >
          <Avatar src={imageUrl || currentUser?.avatar} icon={<UserOutlined />} />
        </Upload>
        <Form
          name="add-user-form"
          onFinish={handleSubmit}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <FormItem
            label="Username"
            name="username"
            initialValue={currentUser?.username}
            rules={[{ required: true, message: 'Please input username!', min: 3 }]}
          >
            <Input size="large" placeholder="Username" disabled />
          </FormItem>
          <FormItem
            label="Email"
            name="email"
            initialValue={currentUser?.email}
            rules={[
              { required: true, message: 'Please input email!', type: 'email' }
            ]}
          >
            <Input size="large" placeholder="Email" />
          </FormItem>
          <FormItem
            label="First Name"
            name="firstName"
            initialValue={currentUser?.firstName}
            rules={[{ required: false, message: 'Please input first name!', min: 3 }]}
          >
            <Input size="large" placeholder="First Name" />
          </FormItem>
          <FormItem
            label="Last Name"
            name="lastName"
            initialValue={currentUser?.lastName}
            rules={[{ required: false, message: 'Please input last name!', min: 3 }]}
          >
            <Input size="large" placeholder="Last Name" />
          </FormItem>
          <FormItem
            label="About"
            name="info"
            initialValue={currentUser?.info}
            rules={[{ required: false, message: 'Please input user info!' }]}
          >
            <Input size="large" placeholder="About" />
          </FormItem>

          <Button id="submit-button" type="primary" size="large" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Content>
    </Container>
  )
}

export default SideBar

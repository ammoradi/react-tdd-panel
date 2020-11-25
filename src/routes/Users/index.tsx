import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  List,
  Avatar,
  Typography,
  Button,
  Modal,
  Descriptions,
  Form,
  Input,
  Popconfirm,
  message
} from 'antd'
import {
  EyeOutlined,
  DeleteOutlined,
  UserOutlined,
  PlusOutlined
} from '@ant-design/icons'

import { IUserModel, IAddUserModel } from 'models/user'
import { usersSelector, selectUserId } from 'store/selectors'
import { addUser, deleteUser } from 'store/user/actions'
import FormItem from 'components/FormItem'

import { Container, ModalAvatarContainer } from './Users.styled'

const { Title } = Typography
const { useForm } = Form

interface IModalState {
  visible: boolean
  user: IAddUserModel
}

const initialModalState: IModalState = {
  visible: false,
  user: {
    id: 0,
    email: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    info: '',
    avatar: ''
  }
}

/**
 * get user name
 * @param f | first name
 * @param l | last name
 * @param u | user name
 */
const getUserName = (
  f: string | undefined,
  l: string | undefined,
  u: string
): string => {
  if (f && l) return `${f} ${l}`
  if (f) return f
  if (l) return l
  return u
}

function Users() {
  const users = useSelector(usersSelector)
  const currentUserId = useSelector(selectUserId)
  const dispatch = useDispatch()
  const [viewModalState, setViewModalState] = useState<IModalState>(initialModalState)
  const [addModalVisible, setAddModalVisibility] = useState<boolean>(false)
  const [userForm] = useForm()

  const handleOpenViewModal = useCallback(
    (user: IUserModel) => () => {
      setViewModalState({ visible: true, user })
    },
    []
  )

  const handleOpenAddModal = useCallback(() => {
    setAddModalVisibility(true)
  }, [])

  const handleCloseModal = useCallback(
    (key: 'view' | 'add') => () => {
      if (key === 'view') {
        setViewModalState(initialModalState)
        return
      }
      setAddModalVisibility(false)
    },
    []
  )

  const submitForm = useCallback(() => {
    userForm.submit()
  }, [])

  const handleSubmit = useCallback((values: IAddUserModel) => {
    try {
      dispatch(addUser(values))
      message.success(`${values.username} added to users list B-)`)
    } catch (_) {
      message.error('Unknown Error!')
    }
    setAddModalVisibility(false)
  }, [])

  const handleDeleteUser = useCallback(
    (id: number) => () => {
      if (id === currentUserId) {
        message.error('Cannot delete yourself!')
        return
      }
      dispatch(deleteUser(id))
    },
    []
  )

  return (
    <>
      <Container>
        <List
          itemLayout="horizontal"
          dataSource={users}
          renderItem={(user) => (
            <List.Item
              actions={[
                <Button
                  type="primary"
                  icon={<EyeOutlined />}
                  size="large"
                  onClick={handleOpenViewModal(user)}
                />,
                <Popconfirm
                  title="Are you sure to delete this user?"
                  onConfirm={handleDeleteUser(user.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="default" icon={<DeleteOutlined />} size="large" />
                </Popconfirm>
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar src={user.avatar} icon={<UserOutlined />} size="large" />
                }
                title={
                  <Title level={3}>
                    {user.id === currentUserId
                      ? 'You'
                      : getUserName(user.firstName, user.lastName, user.username)}
                  </Title>
                }
              />
            </List.Item>
          )}
        />

        <Button
          id="add-user-button"
          type="dashed"
          size="large"
          icon={<PlusOutlined />}
          onClick={handleOpenAddModal}
        />
      </Container>

      <Modal
        title={`@${viewModalState.user.username} information`}
        visible={viewModalState.visible}
        onOk={handleCloseModal('view')}
        onCancel={handleCloseModal('view')}
        centered
        width={768}
      >
        <ModalAvatarContainer>
          <Avatar
            src={viewModalState.user.avatar}
            icon={<UserOutlined />}
            size={86}
          />
        </ModalAvatarContainer>

        <Descriptions layout="vertical" bordered>
          <Descriptions.Item label="Username">
            {viewModalState.user.username}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {viewModalState.user.email}
          </Descriptions.Item>
          <Descriptions.Item label="First Name">
            {viewModalState.user.firstName || '---------'}
          </Descriptions.Item>
          <Descriptions.Item label="Last Name">
            {viewModalState.user.lastName || '---------'}
          </Descriptions.Item>
          <Descriptions.Item label="About User">
            {viewModalState.user.info || '---------'}
          </Descriptions.Item>
        </Descriptions>
      </Modal>

      <Modal
        title="Add User"
        visible={addModalVisible}
        onOk={submitForm}
        onCancel={handleCloseModal('add')}
        centered
        width={500}
      >
        <Form
          name="add-user-form"
          form={userForm}
          onFinish={handleSubmit}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <FormItem
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input username!', min: 3 }]}
          >
            <Input placeholder="Username" />
          </FormItem>
          <FormItem
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input email!', type: 'email' }
            ]}
          >
            <Input placeholder="Email" />
          </FormItem>
          <FormItem
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input password!', min: 4 }]}
          >
            <Input type="password" placeholder="Password" />
          </FormItem>
          <FormItem
            label="First Name"
            name="firstName"
            rules={[{ required: false, message: 'Please input first name!', min: 3 }]}
          >
            <Input placeholder="First Name" />
          </FormItem>
          <FormItem
            label="Last Name"
            name="lastName"
            rules={[{ required: false, message: 'Please input last name!', min: 3 }]}
          >
            <Input placeholder="Last Name" />
          </FormItem>
          <FormItem
            label="About"
            name="info"
            rules={[{ required: false, message: 'Please input user info!' }]}
          >
            <Input placeholder="About" />
          </FormItem>
        </Form>
      </Modal>
    </>
  )
}

export default Users

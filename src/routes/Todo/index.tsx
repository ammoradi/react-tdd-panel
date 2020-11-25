import React, { useState, useCallback, ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import isEmpty from 'lodash.isempty'
import { Button, Input, Divider, Empty, Popconfirm, message } from 'antd'
import {
  PlusOutlined,
  MinusOutlined,
  DeleteOutlined,
  CheckOutlined,
  ReloadOutlined
} from '@ant-design/icons'

import { todoItemsSelector } from 'store/selectors'
import { addTodoItem, removeTodoItem, doneTodoItem } from 'store/app/actions'

import { Container, Content, Row } from './Todo.styled'

const { Search } = Input

function Todo() {
  const dispatch = useDispatch()
  const todoItems = useSelector(todoItemsSelector)
  const [newItemVisible, setNewItemVisible] = useState<boolean>(false)
  const [newItemTitle, setNewItemTitle] = useState<string>('')

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNewItemTitle(e.target.value)
  }, [])

  const toggleForm = useCallback(() => {
    setNewItemVisible((prvState) => !prvState)
  }, [])

  const handleSubmit = useCallback(() => {
    if (!newItemTitle) {
      message.error('Enter Todo Item Title.')
    }

    dispatch(addTodoItem(newItemTitle))
    setNewItemTitle('')
    toggleForm()
  }, [newItemTitle])

  const handleRemove = useCallback(
    (id: number) => () => {
      dispatch(removeTodoItem(id))
    },
    []
  )

  const handleDone = useCallback(
    (id: number) => () => {
      dispatch(doneTodoItem(id))
    },
    []
  )

  return (
    <Container>
      <Content>
        {todoItems.map((item) => (
          <Row key={item.id.toString()} isDone={item.isDone}>
            <p>{item.title}</p>
            <div>
              <Button
                type={item.isDone ? 'default' : 'primary'}
                icon={item.isDone ? <ReloadOutlined /> : <CheckOutlined />}
                onClick={handleDone(item.id)}
              />
              <Divider type="vertical" />
              <Popconfirm
                title="Are you sure to delete this item?"
                onConfirm={handleRemove(item.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="default" icon={<DeleteOutlined />} />
              </Popconfirm>
            </div>
          </Row>
        ))}

        {isEmpty(todoItems) && <Empty />}

        {newItemVisible && (
          <Search
            type="search"
            size="large"
            enterButton="Add"
            onChange={handleChange}
            value={newItemTitle}
            onSearch={handleSubmit}
            autoFocus
          />
        )}

        <Button
          type="dashed"
          size="large"
          icon={newItemVisible ? <MinusOutlined /> : <PlusOutlined />}
          onClick={toggleForm}
          id="add-button"
        />
      </Content>
    </Container>
  )
}

export default Todo

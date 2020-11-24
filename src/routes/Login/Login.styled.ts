import styled from 'styled-components'

import { Form } from 'antd'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

export const StyledForm = styled(Form)`
  min-width: 300px;
  max-width: 400px;
  width: 50%;
  padding: 40px;
  padding-bottom: 10px;
  background-color: ${(props) => props.theme.colors.white};

  h2 {
    text-align: center;
    margin-bottom: 30px;
  }

  button {
    width: 100%;
  }
`

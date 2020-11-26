import styled from 'styled-components'
import { Layout } from 'antd'

const { Header, Content, Footer } = Layout

export const StyledLayout = styled(Layout)`
  min-height: 100vh;
`

export const StyledHeader = styled(Header)`
  background-color: ${(props) => props.theme.colors.white};
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
    line-height: 64px;
  }
`

export const StyledContent = styled(Content)`
  margin: 16px;
  background-color: ${(props) => props.theme.colors.white};
`

export const InnerContent = styled.div`
  padding: 24px;
  min-height: 360px;
`

export const StyledFooter = styled(Footer)`
  text-align: center;
`

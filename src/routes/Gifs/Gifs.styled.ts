import styled from 'styled-components'
import { Row } from 'antd'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const SearchContainer = styled.div`
  width: 100%;
  max-width: 768px;
`

export const StyledRow = styled(Row)`
  margin: 24px 0;
`

export const Gif = styled.div`
  width: 100%;
  margin-bottom: 12px;
  height: 10vw;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

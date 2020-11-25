import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
`

export const Content = styled.div`
  width: 100%;
  max-width: 500px;

  #add-button,
  .ant-input-wrapper {
    width: 100%;
    margin-top: 24px;
  }
`

interface IRowProps {
  isDone: boolean
}
export const Row = styled.div<IRowProps>`
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d9d9d9;

  p {
    font-size: 18px;
    text-decoration: ${(props) => (props.isDone ? 'line-through' : 'none')};
    margin: 0;
    line-height: 64px;
  }
`

import styled from 'styled-components'

export const UserInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 24px;
  cursor: pointer;

  h4 {
    margin-top: 12px;
    margin-bottom: 24px;
    color: ${(props) => props.theme.colors.white};
  }
`

import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .ant-list {
    width: 100%;
    max-width: 480px;

    h4 {
      margin: 0;
      line-height: 40px;
      font-size: 22px;
    }
  }

  #add-user-button {
    width: 100%;
    max-width: 480px;
    margin-top: 20px;
  }
`

export const ModalAvatarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`

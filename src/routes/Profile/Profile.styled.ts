import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
`

export const Content = styled.div`
  width: 100%;
  max-width: 500px;
  padding-top: 16px;

  #submit-button {
    width: 100%;
  }

  .ant-upload-picture-card-wrapper {
    display: block;
    margin-bottom: 24px;
    display: flex;
    justify-content: center;
  }

  .ant-avatar.ant-avatar-circle.ant-avatar-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ant-avatar.ant-avatar-icon {
    width: 100%;
    height: 100%;
    border-radius: 0;
    font-size: 40px;
  }
`

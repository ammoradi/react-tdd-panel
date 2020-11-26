import React, { StrictMode, ReactNode, FC } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import styled from 'styled-components'
import 'antd/dist/antd.css'

import ThemeProvider from 'theme'
import { persistor, store } from 'store/config'

const Container = styled.div`
  width: 100%;
  height: 100%;
`

interface IProps {
  children: ReactNode
}

const App: FC<IProps> = ({ children }) => {
  return (
    <StrictMode>
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <ThemeProvider>
            <Container>{children}</Container>
          </ThemeProvider>
        </Provider>
      </PersistGate>
    </StrictMode>
  )
}

export default App

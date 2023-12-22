import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import styled from 'styled-components'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  const StyledAppLayout = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  `

  const MainContent = styled.div`
    flex: 1;
  `

  return (
    <StyledAppLayout>
      <Header />
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </StyledAppLayout>
  )
}

export default AppLayout

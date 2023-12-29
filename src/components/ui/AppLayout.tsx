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
  const HeaderStyle = styled.div`
    position: fixed;
    background-color: white;
    z-index: 1000;
    width: 100%;
  `

  const MainContent = styled.div`
    margin-top: 75px;
    flex: 1;
  `

  return (
    <StyledAppLayout>
      <HeaderStyle>
        <Header />
      </HeaderStyle>
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </StyledAppLayout>
  )
}

export default AppLayout

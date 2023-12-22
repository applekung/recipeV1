import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import styled from 'styled-components'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  const StyledAppLayout = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
  `
  return (
    <StyledAppLayout>
      <Header />
      <Outlet />
      <Footer />
    </StyledAppLayout>
  )
}

export default AppLayout

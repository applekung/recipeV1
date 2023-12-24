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
  const H = styled.div`
    position: fixed;
    background-color: white; // 원하는 배경색을 지정합니다.
    z-index: 1000; // 다른 요소들 위에 나타나도록 z-index를 지정합니다.
    width: 100%;
`

  const MainContent = styled.div`
    margin-top: 75px;
    flex: 1;
  `

  return (
    <StyledAppLayout>
      <H>
      <Header />
      </H>
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </StyledAppLayout>
  )
}

export default AppLayout

import React from 'react'
import Sidebar from '../../components/myPage/Sidebar'
import { Outlet } from 'react-router-dom'

const Mypage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex">
        <Outlet />
      </div>
    </div>
  )
}

export default Mypage

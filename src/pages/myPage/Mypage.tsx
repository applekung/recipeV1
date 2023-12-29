import React from 'react'
import Sidebar from '../../components/myPage/Sidebar'
import { Outlet, useLocation } from 'react-router-dom'

const Mypage = () => {
  const { pathname } = useLocation()

  return (
    <div className="flex justify-center">
      <Sidebar path={pathname} />
      <div className="flex w-4/5">
        <Outlet />
      </div>
    </div>
  )
}

export default Mypage

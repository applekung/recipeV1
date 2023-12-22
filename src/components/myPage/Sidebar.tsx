import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="flex flex-col w-100">
      <ul>
        <li className="py-5">
          <Link to="/my">닉네임변경</Link>
        </li>
        <li className="py-5">
          <Link to="/my/testComments">나의 댓글</Link>
        </li>
        <li className="py-5">
          <Link to="/my/test">찜한 레시피</Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar

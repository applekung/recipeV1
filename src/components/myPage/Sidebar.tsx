import React from 'react'
import { Link } from 'react-router-dom'

const sidebarItems = [
  { path: '/my', text: '닉네임변경' },
  { path: '/my/myRecipes', text: '나의 레시피' },
  { path: '/my/liked', text: '찜한 레시피' },
]

const Sidebar = ({ path }: { path: string }) => {
  const listStyle = 'p-3 text-slate-700 font-semibold hover:text-primary'

  return (
    <div className="flex flex-col w-100 mr-10 mt-3 gap-2">
      <ul className="border border-slate-200">
        {sidebarItems.map((item, idx) => (
          <li
            key={idx}
            className={
              path === item.path ? 'p-3 font-semibold text-primary' : listStyle
            }
          >
            <Link to={item.path}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar

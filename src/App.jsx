import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

import Main from './pages/Main'
import RecipeSearchList from './pages/RecipeCategoryList'
import RecipeCategoryList from './pages/RecipeCategoryList'
import Detail from './pages/Detail'
import Login from './pages/user/Login'
import Signup from './pages/user/Signup'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="detail" element={<Detail />} />
      <Route path="search" element={<RecipeSearchList />} />
      <Route path="category" element={<RecipeCategoryList />} />
      <Route path="login" element={<Login />} />
      <Route path="signUp" element={<Signup />} />
    </Routes>
  )
}

export default App

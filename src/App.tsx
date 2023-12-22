import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

import Main from './pages/Main'
import RecipeSearchList from './pages/list/RecipeSearchList'
import RecipeCategoryList from './pages/RecipeCategoryList'
import Detail from './pages/Detail'
import Login from './pages/user/Login'
import NicknameEdit from './pages/user/nicknameEdit'
import Callback from './pages/user/callBack'
import UploadRecipe from './pages/UploadRecipe'
// import Signup from './pages/user/Signup'
import LikedRecipes from './pages/myPage/LikedRecipes'
import MyComments from './pages/myPage/myComments'
import DeleteUser from './pages/user/deleteUser'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 600000,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/test" element={<LikedRecipes />} />
        <Route path="/testComments" element={<MyComments />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/category" element={<RecipeCategoryList />} />
        <Route path="/login" element={<Login />} />
        <Route path="search" element={<RecipeSearchList />} />
        <Route path="category" element={<RecipeCategoryList />} />
        <Route path="login" element={<Login />} />
        <Route path="/delete" element={<DeleteUser />} />
        <Route path="nickname" element={<NicknameEdit />} />
        <Route path="oauth" element={<Callback />} />
        <Route path="uploadrecipe" element={<UploadRecipe />} />
        {/* <Route path="signUp" element={<Signup />} /> */}
      </Routes>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          className: 'text-base max-w-screen-sm p-4 bg-lightgray text-darkgray',
        }}
      />
    </QueryClientProvider>
  )
}

export default App

import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AppLayout from './components/ui/AppLayout'
import Main from './pages/Main'
import Detail from './pages/Detail'
import Login from './pages/user/Login'
import Header from './components/common/Header'
import NicknameEdit from './pages/user/nicknameEdit'
import Callback from './pages/user/callBack'
import UploadRecipe from './pages/UploadRecipe'
// import Signup from './pages/user/Signup'
import LikedRecipes from './pages/myPage/LikedRecipes'
import MyComments from './pages/myPage/myComments'
import DeleteUser from './pages/user/deleteUser'
import Mypage from './pages/myPage/Mypage'
import ModifyRecipe from './pages/ModifyPage'
import CategoryManagement from './pages/admin/CategoryMenagement'
import SearchCategotyErrorBoundary from './pages/list/RecipeSearchCategoryList'
import SearchErrorBoundary from './pages/list/RecipeSearchList'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Main />} />
        <Route path="/my" element={<Mypage />}>
          <Route index element={<NicknameEdit />} />
          <Route path="/my/myComments" element={<MyComments />} />
          <Route path="/my/liked" element={<LikedRecipes />} />
        </Route>
        <Route path="/detail/:itemId" element={<Detail />} />
        <Route path="/login" element={<Login />} />
        <Route path="search/:keyword" element={<SearchErrorBoundary />} />
        <Route
          path="category/:category"
          element={<SearchCategotyErrorBoundary />}
        />
        <Route path="/delete" element={<DeleteUser />} />
        <Route path="oauth" element={<Callback />} />
        <Route path="uploadrecipe" element={<UploadRecipe />} />
        <Route path="/modify" element={<ModifyRecipe />} />
        <Route path="admin_caterory" element={<CategoryManagement />} />
      </Route>
    </Routes>
  )
}

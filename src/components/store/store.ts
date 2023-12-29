import { access } from 'fs/promises'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import LikedRecipes from '../../pages/myPage/LikedRecipes'

export interface StoreState {
  likedRecipes: number[]
  toggleLikedRecipe: (recipeId: number) => void
  isLiked: (recipeId: number) => boolean
  accessToken: string | null
  setAccessToken: (token: string | null) => void
  getAccessToken: () => string | null
  clearToken: () => void
  clearLikedRecipe: () => void
}

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (set, get) => ({
        likedRecipes: [],
        clearLikedRecipe: () => {
          set((state) => ({ likedRecipes: [] }))
        },
        isLiked: (recipeId: number) =>
          get().likedRecipes.includes(recipeId) ? true : false,
        toggleLikedRecipe: (recipeId: number) =>
          set((state) => ({
            likedRecipes: state.likedRecipes.includes(recipeId)
              ? state.likedRecipes.filter((id) => id !== recipeId)
              : [...state.likedRecipes, recipeId],
          })),
        accessToken: null,
        setAccessToken: (newToken) => {
          if (newToken === null || typeof newToken !== 'string') {
            console.error('유효하지 않은 토큰 형식입니다.')
          } else {
            set(() => ({ accessToken: newToken }))
          }
        },
        clearToken: () => {
          set(() => ({ accessToken: null }))
        },
        getAccessToken: () => get().accessToken,
      }),
      {
        name: 'mystore',
        getStorage: () => localStorage,
      },
    ),
  ),
)

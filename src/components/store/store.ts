import { access } from 'fs/promises'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface StoreState {
  likedRecipes: string[]
  toggleLikedRecipe: (recipeId: string) => void
  isLiked: (recipeId: string) => boolean
  accessToken: string | null
  setAccessToken: (token: string | null) => void
}

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (set, get) => ({
        likedRecipes: [],
        isLiked: (recipeId: string) =>
          get().likedRecipes.includes(recipeId) ? true : false,
        toggleLikedRecipe: (recipeId: string) =>
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
        getAccessToken: () => get().accessToken,
      }),
      { name: 'store' },
    ),
  ),
)

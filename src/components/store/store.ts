import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface LikedState {
  likedRecipes: string[]
  toggleLikedRecipe: (recipeId: string) => void
  isLiked: (recipeId: string) => boolean
}

export const useStore = create<LikedState>()(
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
      }),
      { name: 'store' },
    ),
  ),
)

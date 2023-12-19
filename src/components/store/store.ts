import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface LikedState {
  likedRecipes: string[]
  toggleLikedRecipe: (recipeId: string) => void
}

export const useStore = create<LikedState>()(
  devtools(
    persist(
      (set) => ({
        likedRecipes: [],
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

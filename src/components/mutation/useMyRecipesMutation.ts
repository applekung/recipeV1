import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import {
  fetchDeleteRecipe,
  fetchDeleteRecipes,
} from '../../fetch/fetchDeleteRecipe'

import { useQueryClient } from '@tanstack/react-query'

export const useDeleteRecipesMutation = (
  checkedItems: number[],
  setCheckedItems: React.Dispatch<React.SetStateAction<number[]>>,
) => {
  const queryClient = useQueryClient()
  const { mutate: deleteRecipes, isPending: isDeleting } = useMutation<
    void,
    Error
  >({
    mutationFn: () => fetchDeleteRecipes(checkedItems),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['myRecipes'] })
      const previousRecipes = queryClient.getQueriesData(['myRecipes'])
      queryClient.setQueriesData(
        ['myRecipes'],
        previousRecipes[0][1].filter(
          (recipe) => !checkedItems.includes(recipe.recipeId),
        ),
      )

      return { previousRecipes }
    },
    onSuccess: () => {
      toast.success('레시피 삭제 완료')
    },
    onError: (err, _, context) => {
      toast.error('잠시 후 다시 시도해주세요')
      queryClient.setQueriesData(['myRecipes'], context.previousRecipes)
    },
    onSettled: () => {
      // queryClient.invalidateQueries({ queryKey: ['myRecipes'] })
    },
  })

  return { deleteRecipes, isDeleting }
}

export const useDeleteRecipeMutation = (id: number) => {
  const queryClient = useQueryClient()
  const { mutate: deleteRecipe, isPending: isDeleting } = useMutation<
    void,
    Error
  >({
    mutationFn: () => fetchDeleteRecipe(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['myRecipes'] })
      const previousRecipes = queryClient.getQueriesData(['myRecipes'])
      queryClient.setQueriesData(
        ['myRecipes'],
        previousRecipes[0][1].filter((recipe) => recipe.recipeId !== id),
      )
      return { previousRecipes }
    },
    onSuccess: () => {
      toast.success('레시피 삭제 완료')
    },
    onError: () => {
      toast.error('잠시 후 다시 시도해주세요')
      queryClient.setQueriesData(['myRecipes'], context.previousRecipes)
    },
    onSettled: () => {
      // queryClient.invalidateQueries({ queryKey: ['myRecipes'] })
    },
  })

  return { deleteRecipe, isDeleting }
}

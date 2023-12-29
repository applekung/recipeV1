import axios from 'axios'
import { RecipeCard } from './APIResponsesTypes'
import { QueryFunction } from '@tanstack/react-query'

const fetchRecipeById = async (recipeId: number): Promise<RecipeCard> => {
  try {
    const response = await axios.get(
      `http://kdt-sw-7-team06.elicecoding.com:3000/recipes/${recipeId}`,
    )
    console.log('response')
    console.log(response.data)
    return response.data
  } catch (error) {
    throw new Error('내가 찜한 레시피 불러오는 중 오류 발생')
  }
}

export const fetchRecipeListById: QueryFunction<RecipeCard[]> = async ({
  queryKey,
}) => {
  const recipeIds = queryKey[1]
  try {
    const recipePromises = recipeIds.map((id) => fetchRecipeById(id))
    const recipeList = await Promise.all(recipePromises)
    return recipeList
  } catch (error) {
    throw new Error('내가 찜한 레시피 불러오는 중 오류 발생')
  }
}

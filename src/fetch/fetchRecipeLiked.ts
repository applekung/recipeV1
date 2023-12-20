import axios from 'axios'
import { TempRecipe } from './APIResponsesTypes'

const fetchRecipeById = async (recipeId: string): Promise<TempRecipe> => {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${recipeId}`,
    )
    return response.data
  } catch (error) {
    throw new Error('내가 찜한 레시피 불러오는 중 오류 발생')
  }
}

export const fetchRecipeListById = async (
  recipeIds: string[],
): Promise<TempRecipe[]> => {
  try {
    const recipePromises = recipeIds.map((id) => fetchRecipeById(id))
    const recipeList = await Promise.all(recipePromises)
    return recipeList
  } catch (error) {
    throw new Error('내가 찜한 레시피 불러오는 중 오류 발생')
  }
}

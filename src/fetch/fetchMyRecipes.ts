import axios from 'axios'
import { RecipeCard } from './APIResponsesTypes'
import { QueryFunction } from '@tanstack/react-query'

const fetchMyRecipe: QueryFunction<RecipeCard[]> = async ({ queryKey }) => {
  try {
    const apiRes = await axios.get(
      `http://kdt-sw-7-team06.elicecoding.com:3000/recipes`,
    )
    return apiRes.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default fetchMyRecipe

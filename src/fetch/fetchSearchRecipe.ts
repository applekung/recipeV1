import axios from 'axios'
import { RecipeCard } from './APIResponsesTypes'
import { QueryFunction } from '@tanstack/react-query'

const fetchSearchRecipe: QueryFunction<RecipeCard[]> = async ({ queryKey }) => {
  const { category, items, page, keyword } = queryKey[1]

  try {
    let apiRes

    if (category) {
      apiRes = await axios.get(
        `http://kdt-sw-7-team06.elicecoding.com:3000/recipes`,
        // `http://kdt-sw-7-team06.elicecoding.com:3000/top-categorys/${category}`,
      )
    } else {
      apiRes = await axios.get(
        `http://kdt-sw-7-team06.elicecoding.com:3000/recipes`,
      )
      if (keyword !== '모든레시피')
        return apiRes.data.filter((recipe) =>
          recipe.recipeName.includes(keyword),
        )
    }

    return apiRes.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default fetchSearchRecipe

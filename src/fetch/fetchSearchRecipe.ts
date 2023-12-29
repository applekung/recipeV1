import axios from 'axios'
import { RecipeCard } from './APIResponsesTypes'
import { QueryFunction } from '@tanstack/react-query'
const getCategoryApiData = async (id) => {
  try {
    const categoryApiRes = await axios.get(
      'http://kdt-sw-7-team06.elicecoding.com:3000/categorys',
    )
    return categoryApiRes.data.filter(
      (item) => item.categoryName.indexOf(id) !== -1,
    )
  } catch (e) {
    console.log('category api get error', e)
  }
}

const fetchSearchRecipe: QueryFunction<RecipeCard[]> = async ({ queryKey }) => {
  const { category, items, page, keyword } = queryKey[1]

  try {
    let apiRes

    if (category) {

      const getApiId = await getCategoryApiData(category);
      const getApData = getApiId[0].categoryId;
      apiRes = await axios.get(
        `http://kdt-sw-7-team06.elicecoding.com:3000/categorys/${getApData}`,
        // `http://kdt-sw-7-team06.elicecoding.com:3000/top-categorys/${category}`,
      )
      return apiRes.data.recipes
    } else {
      apiRes = await axios.get(
        `http://kdt-sw-7-team06.elicecoding.com:3000/recipes`,
      )
      if (keyword !== '모든레시피') {
        return apiRes.data.filter((recipe) =>
          recipe.recipeName.includes(keyword),
        )
      } else {
        return apiRes.data
      }
    }

    return apiRes.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default fetchSearchRecipe
function categoryApiRes() {
  throw new Error('Function not implemented.')
}

import axios from 'axios'
import { RecipeCard } from './APIResponsesTypes'
import { QueryFunction } from '@tanstack/react-query'

const fetchSearchRecipe: QueryFunction<RecipeCard[]> = async ({ queryKey }) => {
  const { category, items, page, keyword } = queryKey[1]

  console.log('category', category)

  try {
    const categoryApiRes = await axios.get(
      'http://kdt-sw-7-team06.elicecoding.com:3000/categorys',
    )
    return categoryApiRes.data.filter(
      (item) => item.categoryName.indexOf(category) !== -1,
    )
    // categoryApiRes.data.filter((item) => {
    //   item.categoryName.indexOf(category) !== -1
    // })
    // return categoryApiRes.data.filter((item) => {
    //   item.categoryName.indexOf(category) !== -1
    // })
  } catch (e) {
    console.log('category api get error', e)
  }

  try {
    let apiRes

    if (category) {
      apiRes = await axios.get(
        `http://kdt-sw-7-team06.elicecoding.com:3000/categorys/${categoryApiRes.categoryId}`,
        // `http://kdt-sw-7-team06.elicecoding.com:3000/top-categorys/${category}`,
      )
      // return apiRes.data.recipes
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

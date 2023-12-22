import axios from 'axios'
import { QueryFunction } from '@tanstack/react-query'
import { TempRecipe } from './APIResponsesTypes'

const fetchTestComment: QueryFunction<TempRecipe[]> = async ({ queryKey }) => {
  try {
    const apiRes = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?_limit=10`,
    )

    if (apiRes.status !== 200) {
      throw new Error('레시피 로드중 에러발생.')
    }

    return apiRes.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default fetchTestComment

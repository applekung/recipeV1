import axios from 'axios'
import { QueryFunction } from '@tanstack/react-query'
import { Comment } from './APIResponsesTypes'

const fetchTestComment: QueryFunction<Comment[]> = async ({ queryKey }) => {
  const { recipeId } = queryKey[1]
  try {
    const apiRes = await axios.get(
      `http://kdt-sw-7-team06.elicecoding.com:3000/recipes/${recipeId}`,
    )

    return apiRes.data.reviews
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default fetchTestComment

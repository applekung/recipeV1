import axios from 'axios'
import { QueryFunction } from '@tanstack/react-query'
import { Comment } from './APIResponsesTypes'

const fetchTestComment: QueryFunction<Comment[]> = async ({ queryKey }) => {
  // NOTE 유저아이디 스토어에서 가져오기

  try {
    const apiRes = await axios.get(
      // `https://jsonplaceholder.typicode.com/comments?_limit=10`,
      `http://kdt-sw-7-team06.elicecoding.com:3000/reviews`,
    )

    return apiRes.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default fetchTestComment

import axios from 'axios'
import { ListBySearchAPIResponse } from './APIResponsesTypes'
import { QueryFunction } from '@tanstack/react-query'

const fetchTestGet: QueryFunction<string> = async ({ queryKey }) => {
  const { keyword, category, items, page } = queryKey[1]

  try {
    const apiRes = await axios.get(
      `http://kdt-sw-7-team06.elicecoding.com:3000/recipe`,
    )

    if (apiRes.status !== 200) {
      throw new Error('레시피 로드중 에러발생.')
    }
    console.log(apiRes)
    return apiRes.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default fetchTestGet

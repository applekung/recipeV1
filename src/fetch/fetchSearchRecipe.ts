import axios from 'axios'
import { ListBySearchAPIResponse } from './APIResponsesTypes'
import { QueryFunction } from '@tanstack/react-query'

const fetchSearchRecipe: QueryFunction<ListBySearchAPIResponse> = async ({
  queryKey,
}) => {
  const { keyword, items, page } = queryKey[1]

  try {
    const apiRes = await axios.get(`api호출 주소`)

    if (apiRes.status !== 200) {
      throw new Error('레시피 로드중 에러발생.')
    }

    return apiRes.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default fetchSearchRecipe

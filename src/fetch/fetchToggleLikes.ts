import { AxiosResponse } from 'axios'
import axios from 'axios'

const fetchToggleLikes = async (
  recipeId: string,
  isLiked: boolean,
): Promise<any> => {
  const response: AxiosResponse<any> = await axios.request({
    method: isLiked ? 'get' : 'delete',
    url: `https://jsonplaceholder.typicode.com/posts/${recipeId}`,
  })
  return response.data
}

export default fetchToggleLikes

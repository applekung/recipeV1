import { AxiosResponse } from 'axios'
import axios from 'axios'

const fetchAddLikes = async (recipeId: string): Promise<any> => {
  // const response: AxiosResponse<any> = await axios.post(
  const response: AxiosResponse<any> = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${recipeId}`,
  )
  return response.data
}

export default fetchToggleLikes

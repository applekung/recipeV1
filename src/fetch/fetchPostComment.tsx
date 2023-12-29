import axios from 'axios'

export const fetchPostComment = async (recipeId: string): Promise<void> => {
  const response = await axios.get(`http`)
  return response.data
}

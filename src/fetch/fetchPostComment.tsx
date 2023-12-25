import axios from 'axios'

export const fetchPostComment = async (recipeId: string): Promise<void> => {
  // const response = await axios.post(
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/1`,
  )
  return response.data
}

import axios from 'axios'

export const fetchAddLike = async (recipeId: number): Promise<void> => {
  // const response = await axios.post(
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${recipeId}`,
  )
  return response.data
}

export const fetchDeleteLike = async (recipeId: number): Promise<void> => {
  try {
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${recipeId}`,
    )
    return response.data
  } catch (error) {
    throw new Error('내가 찜한 레시피 삭제하는 중 오류 발생')
  }
}

export const fetchDeleteLikes = async (recipeIds: number[]): Promise<void> => {
  try {
    const recipePromises = recipeIds.map((id) => fetchDeleteLike(id))
    await Promise.all(recipePromises)
  } catch (error) {
    throw new Error('내가 찜한 레시피 삭제하는 중 오류 발생')
  }
}

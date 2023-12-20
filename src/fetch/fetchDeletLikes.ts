import axios from 'axios'

const fetchDeleteLikes = async (recipeIds: string[]): Promise<void> => {
  const deleteRequests = recipeIds.map((recipeId) => {
    return axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${recipeId}`,
    )
  })

  try {
    await Promise.all(deleteRequests)
  } catch (error) {
    throw new Error('Error deleting recipes')
  }
}

export default fetchDeleteLikes

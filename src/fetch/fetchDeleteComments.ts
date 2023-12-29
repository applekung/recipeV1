import axios from 'axios'

export const fetchDeleteComment = async (commentIds: number): Promise<void> => {
  try {
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${commentIds}`,
    )
    return response.data
  } catch (error) {
    throw new Error('댓글 삭제하는 중 오류 발생')
  }
}

export const fetchDeleteComments = async (
  commentIds: number[],
): Promise<void> => {
  try {
    const recipePromises = commentIds.map((id) => fetchDeleteComment(id))
    await Promise.all(recipePromises)
  } catch (error) {
    throw new Error('댓글 삭제하는 중 오류 발생')
  }
}

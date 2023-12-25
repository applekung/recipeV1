import moment from 'moment'
import { TempRecipe } from '../../fetch/APIResponsesTypes'
import {
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} from '../mutation/useCommentsMutation'
import StarRating from './StarRating'
import { useEffect, useState } from 'react'

const CommentItem = ({ comment }: TempRecipe) => {
  console.log(comment)
  const commentDate = new Date()
  const momentDate = moment(commentDate)
  const formattedDate = momentDate.format('YYYY-MM-DD, h:mm')
  const [selectedRating, setSelectedRating] = useState(comment.postId || 0)
  const [commentContent, setCommentContent] = useState(comment.name || '')

  const handleRatingChange = (rating: number): void => {
    setSelectedRating(rating)
  }
  const { updateComment, isUpdating } = useUpdateCommentMutation()
  const { deleteComment, isDeleting } = useDeleteCommentMutation()

  useEffect(() => {
    console.log('업데이트 로직 일어남')
    setCommentContent(comment.name)
    setSelectedRating(comment.postId)
  }, [isUpdating, comment.name])

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const updatedComment = {
      ...comment,
      name: commentContent,
      postId: selectedRating,
    }
    updateComment(updatedComment)
    setCommentContent('')
    setSelectedRating(0)
  }

  interface Comment {
    name: string
  }
  return (
    <div className="flex">
      <form onSubmit={handleFormSubmit}>
        <div>유저아이디는{comment.id}</div>
        <div>
          <label htmlFor="starRating">별점:</label>
          <StarRating
            selectedRating={selectedRating}
            onRatingChange={handleRatingChange}
          />
        </div>
        <div>
          <textarea
            id="commentContent"
            name="commentContent"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
        </div>
        <div>{formattedDate}</div>
        <button type="submit" disabled={isUpdating}>
          작성완료
        </button>
      </form>

      <button
        onClick={() => {
          deleteComment(comment.id)
        }}
        disabled={isDeleting}
      >
        X
      </button>
    </div>
  )
}

export default CommentItem

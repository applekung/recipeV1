import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { TempRecipe } from '../../fetch/APIResponsesTypes'
import {
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} from '../mutation/useCommentsMutation'
import StarRating from './StarRating'

const CommentItem = ({ comment }: TempRecipe) => {
  const commentDate = new Date()
  const momentDate = moment(commentDate)
  const formattedDate = momentDate.format('YYYY-MM-DD, h:mm')

  const loginId = 5

  const [selectedRating, setSelectedRating] = useState(comment.postId || 0)
  const [commentContent, setCommentContent] = useState(comment.name || '')
  const [isEditing, setIsEditing] = useState(false) // Edit state

  const { updateComment, isUpdating } = useUpdateCommentMutation()
  const { deleteComment, isDeleting } = useDeleteCommentMutation()

  useEffect(() => {
    setCommentContent(comment.name)
    setSelectedRating(comment.postId)
  }, [isUpdating, comment.name])

  const handleRatingChange = (rating: number): void => {
    setSelectedRating(rating)
  }

  const handleEditClick = () => {
    setIsEditing(true)
  }

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
    setIsEditing(false)
  }

  return (
    <div className="flex">
      {isEditing ? (
        <form onSubmit={handleFormSubmit}>
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
          <button type="submit" disabled={isUpdating}>
            작성완료
          </button>
        </form>
      ) : (
        <div className="flex flex-col">
          <div>유저아이디는{comment.id}</div>
          <StarRating selectedRating={comment.postId} readOnly={true} />
          <div>{commentContent}</div>
          <div>{formattedDate}</div>
        </div>
      )}

      {!isEditing && loginId === comment.id && (
        <button onClick={handleEditClick}>수정</button>
      )}
      {loginId === comment.id && (
        <button
          onClick={() => {
            deleteComment(comment.id)
          }}
          disabled={isDeleting}
        >
          삭제
        </button>
      )}
    </div>
  )
}

export default CommentItem

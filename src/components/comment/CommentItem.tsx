import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Comment } from '../../fetch/APIResponsesTypes'
import {
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} from '../mutation/useCommentsMutation'
import StarRating from './StarRating'

const CommentItem = ({ review }: { review: Comment }) => {
  const momentDate = moment(review.createdAt)
  const formattedDate = momentDate.format('YYYY-MM-DD. h:mm')

  const loginId = 5

  const [selectedRating, setSelectedRating] = useState(review.star || 0)
  const [commentContent, setCommentContent] = useState(review.comment || '')
  const [isEditing, setIsEditing] = useState(false)

  const { updateComment, isUpdating } = useUpdateCommentMutation()
  const { deleteComment, isDeleting } = useDeleteCommentMutation()

  useEffect(() => {
    setCommentContent(review.comment)
    setSelectedRating(review.star)
  }, [isUpdating, review.comment])

  const handleRatingChange = (rating: number): void => {
    setSelectedRating(rating)
  }

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const updatedComment = {
      ...review,
      comment: commentContent,
      reviewId: review.reviewId,
      star: selectedRating,
    }
    updateComment(updatedComment)
    setCommentContent('')
    setSelectedRating(0)
    setIsEditing(false)
  }

  return (
    <div className="flex my-3">
      {isEditing ? (
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-2">
          <div className="flex">
            <StarRating
              selectedRating={selectedRating}
              onRatingChange={handleRatingChange}
            />
          </div>
          <div className="flex flex-row">
            <div>
              <textarea
                id="commentContent"
                name="commentContent"
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                className="p-2 w-[42rem] rounded border border-gray-300 focus:outline-none resize-none"
              />
            </div>
            <div className="ml-2">
              <button type="submit" disabled={isUpdating}>
                완료
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="flex my-3">
          <div className="flex flex-col w-[42rem] gap-1">
            <div className="flex gap-2">
              <StarRating selectedRating={review.star} readOnly={true} />
              <span className="font-bold">{review.star}</span>
            </div>
            <div className="flex gap-2">
              <div className="text-sm font-medium">샐러드요정</div>
              <div className="text-sm">{formattedDate}</div>
            </div>
            <div className="font-light">{commentContent}</div>
          </div>
          <div className="flex gap-2">
            {!isEditing && loginId === 5 && (
              <button onClick={handleEditClick}>수정</button>
            )}
            {loginId === 5 && (
              <button
                onClick={() => {
                  deleteComment(review.reviewId)
                }}
                disabled={isDeleting}
              >
                삭제
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CommentItem

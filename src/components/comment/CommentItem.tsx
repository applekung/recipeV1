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
  const formattedDate = momentDate.format('YYYY-MM-DD. h:mm')

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
    <div className="flex my-3">
      {isEditing ? (
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-2">
          <div className="flex">
            {/* <label htmlFor="starRating">별점: </label> */}
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
              <StarRating selectedRating={comment.postId} readOnly={true} />
              <span className="font-bold">{comment.postId}</span>
            </div>
            <div className="flex gap-2">
              <div className="text-sm font-medium">샐러드요정</div>
              <div className="text-sm">{formattedDate}</div>
            </div>
            <div className="font-light">{commentContent}</div>
          </div>
          <div className="flex gap-2">
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
        </div>
      )}
    </div>
  )
}

export default CommentItem

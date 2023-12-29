import React, { useState } from 'react'
import StarRating from './StarRating'
import toast from 'react-hot-toast'
import { usePostCommentMutation } from '../mutation/useCommentsMutation'

const WriteComment = () => {
  const [selectedRating, setSelectedRating] = useState(0)
  const [commentContent, setCommentContent] = useState('')

  const { postComment, isPosting } = usePostCommentMutation()

  const handleRatingChange = (rating: number): void => {
    setSelectedRating(rating)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    if (selectedRating === 0) {
      toast.error('별점을 입력해주세요')
      return
    }
    if (commentContent.trim() === '') {
      toast.error('내용을 입력해주세요')
      return
    }

    postComment({ comment: commentContent, star: selectedRating })
    setSelectedRating(0)
    setCommentContent('')
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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
          <button type="submit" disabled={isPosting}>
            완료
          </button>
        </div>
      </div>
    </form>
  )
}
export default WriteComment

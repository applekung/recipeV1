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

    postComment({ name: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ' })
    setSelectedRating(0)
    setCommentContent('')
  }
  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit" disabled={isPosting}>
        작성완료
      </button>
    </form>
  )
}
export default WriteComment

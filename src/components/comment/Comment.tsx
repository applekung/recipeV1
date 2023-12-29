import React, { useState } from 'react'
import StarRating from './StarRating'
import toast from 'react-hot-toast'

const Comment = () => {
  const [selectedRating, setSelectedRating] = useState(0)
  const [commentContent, setCommentContent] = useState('')

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

    const formData = new FormData()
    formData.append('commentContent', commentContent)

    console.log(commentContent)
    console.log(selectedRating)
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
      <button type="submit">작성완료</button>
    </form>
  )
}
export default Comment

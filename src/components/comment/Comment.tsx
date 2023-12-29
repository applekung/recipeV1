import React, { useEffect, useState } from 'react'
import WriteComment from './WriteComment'
import { Comment } from '../../fetch/APIResponsesTypes'
import { useQuery } from '@tanstack/react-query'
import fetchTestComment from '../../fetch/fetchMyComment'
import CommentItem from './CommentItem'

const Comment = () => {
  const [commentList, setCommentList] = useState<Comment[]>([])

  const { data, isLoading, isError } = useQuery<Comment[]>({
    queryKey: ['comments'],
    queryFn: fetchTestComment,
  })

  useEffect(() => {
    if (!isLoading && data) {
      setCommentList(data)
    }
  }, [isLoading, data])

  return (
    <div className="w-5/6 flex flex-col items-center justify-center">
      <WriteComment />
      {commentList?.map((comment) => (
        <div
          key={comment.reviewId}
          className="w-full flex flex-col items-center justify-center"
        >
          <CommentItem review={comment} />
        </div>
      ))}
    </div>
  )
}
export default Comment

import React, { useEffect, useState } from 'react'
import WriteComment from './WriteComment'
import { Tempcomment } from '../../fetch/APIResponsesTypes'
import { useQuery } from '@tanstack/react-query'
import fetchTestComment from '../../fetch/fetchMyComment'
import CommentItem from './CommentItem'

const Comment = () => {
  const [commentList, setCommentList] = useState<Tempcomment[]>([])

  const { data, isLoading, isError } = useQuery<Tempcomment[]>({
    queryKey: ['comments'],
    queryFn: fetchTestComment,
  })

  useEffect(() => {
    if (!isLoading && data && data?.length) {
      setCommentList(data)
    }
  }, [isLoading, data])

  return (
    <div>
      <WriteComment />
      {commentList.map((comment) => (
        <div key={comment}>
          <CommentItem comment={comment} />
        </div>
      ))}
    </div>
  )
}
export default Comment

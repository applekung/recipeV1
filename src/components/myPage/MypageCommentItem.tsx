import React from 'react'
import { TempRecipe } from '../../fetch/APIResponsesTypes'
import { useDeleteCommentMutation } from '../../components/mutation/useCommentsMutation'
import moment from 'moment'

const MypageCommentItem = ({ comment }: TempRecipe) => {
  const commentDate = new Date()
  const momentDate = moment(commentDate)
  const formattedDate = momentDate.format('YYYY-MM-DD, h:mm')

  const { deleteComment, isDeleting } = useDeleteCommentMutation(comment.id)

  return (
    <div className="flex gap-3">
      <img
        className="w-20 h-20 object-cover"
        src={
          'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fCVFQyU5QSU5NCVFQiVBNiVBQ3xlbnwwfHwwfHx8MA%3D%3D'
        }
        alt={`${comment.title}의 메인이미지`}
      />

      <div className="flex flex-col">
        <div>{comment.name}</div>
        <div>글의제목{comment.postId}</div>
        <div>{formattedDate}</div>
      </div>
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

export default MypageCommentItem

import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Tempcomment } from '../../fetch/APIResponsesTypes'
import fetchTestComment from '../../fetch/fetchTestComment'
import { TbMinusVertical } from 'react-icons/tb'
import MypageCommentItem from '../../components/myPage/MypageCommentItem'
import { useDeleteCommentsMutation } from '../../components/mutation/useCommentsMutation'

function MyComments() {
  const userId = 1
  const [commentList, setCommentList] = useState<Tempcomment[]>([])
  const [checkedItems, setCheckedItems] = useState<number[]>([])

  useEffect(
    () => () => {
      setCheckedItems([])
    },
    [],
  )

  const { data, isLoading, isError } = useQuery<Tempcomment[]>({
    queryKey: ['comments'],
    // 유저 아이디는 fetchFn에서 store에사
    queryFn: fetchTestComment,
  })

  const { deleteComments, isDeleting } = useDeleteCommentsMutation(
    checkedItems,
    setCheckedItems,
  )

  if (isError) {
    throw new Error('나의 댓글 목록을 불러오는 중 오류가 발생했습니다.')
  }

  useEffect(() => {
    if (!isLoading && data && data?.length) {
      setCommentList(data)
    }
  }, [isLoading, data])

  const handleSingleCheck = (checked, commentId: number) => {
    setCheckedItems((prevCheckedItems) => {
      if (checked) {
        return [...prevCheckedItems, commentId]
      }
      return prevCheckedItems.filter((id) => id !== commentId)
    })
  }

  const handleAllCheck = (checked) => {
    if (checked) {
      setCheckedItems(commentList.map((comment) => comment.id))
      return
    }
    setCheckedItems([])
  }

  const handelDelete = () => {
    deleteComments(checkedItems)
  }

  return (
    <div>
      <h2>댓글 목록({commentList.length})</h2>
      <div className="flex flex-col justify-center w-full">
        <div>
          <input
            type="checkbox"
            checked={checkedItems.length === commentList.length}
            onChange={(e) => handleAllCheck(e.target.checked)}
            disabled={commentList.length === 0}
          />
          <span className="text-gray-900 text-lg font-semibold ml-2">
            전체선택
          </span>
          <TbMinusVertical className="text-gray-400 my-5 -ml-2 inline text-[1.5rem]" />
          <button
            className="text-gray-900 my-5 text-lg font-semibold cursor-pointer"
            onClick={() => handelDelete()}
            disabled={isDeleting}
          >
            선택삭제
          </button>
        </div>
        <div className="grid w-full max-w-6xl grid-cols-1 gap-x-6">
          {commentList.length ? (
            commentList.map((comment) => (
              <div key={comment.id} className="flex">
                <input
                  type="checkbox"
                  checked={!!checkedItems.includes(comment.id)}
                  onChange={(e) =>
                    handleSingleCheck(e.target.checked, comment.id)
                  }
                />
                <MypageCommentItem comment={comment} />
              </div>
            ))
          ) : (
            <div>찜한 레시피가 없습니다</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyComments

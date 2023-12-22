import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import {
  fetchDeleteComment,
  fetchDeleteComments,
} from '../../fetch/fetchcDeleteComments'

export const useCommentsMutation = (
  checkedItems: number[],
  setCheckedItems: React.Dispatch<React.SetStateAction<number[]>>,
) => {
  const { mutate: deleteComments, isPending: isDeleting } = useMutation<
    void,
    Error
  >({
    mutationFn: () => fetchDeleteComments(checkedItems),
    onMutate: () => {
      // checkedItems을 이용한 낙관적 쿼리키업데이트
    },
    onSuccess: () => {
      toast.success('댓글 삭제 완료')
      setCheckedItems([])
    },
    onError: () => {
      toast.error('잠시 후 다시 시도해주세요')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] })
    },
  })

  return { deleteComments, isDeleting }
}

export const useDeleteLikeMutation = (id: number) => {
  const { mutate: deleteComment, isPending: isDeleting } = useMutation<
    void,
    Error,
    number
  >({
    mutationFn: (id: number) => fetchDeleteComment(id),
    onMutate: (id: number) => {
      // 낙관적쿼리키업데이트
    },
    onSuccess: () => {
      toast.success('댓글 삭제 완료')
    },
    onError: () => {
      toast.error('잠시 후 다시 시도해주세요')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] })
    },
  })

  return { deleteComment, isDeleting }
}

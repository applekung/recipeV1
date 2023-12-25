import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import {
  fetchDeleteComment,
  fetchDeleteComments,
} from '../../fetch/fetchDeleteComments'

import { useQueryClient } from '@tanstack/react-query'

export const useDeleteCommentsMutation = (
  checkedItems: number[],
  setCheckedItems: React.Dispatch<React.SetStateAction<number[]>>,
) => {
  const queryClient = useQueryClient()
  const { mutate: deleteComments, isPending: isDeleting } = useMutation<
    void,
    Error
  >({
    mutationFn: () => fetchDeleteComments(checkedItems),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['myComments'] })
      const previousComments = queryClient.getQueriesData(['myComments'])
      queryClient.setQueriesData(
        ['myComments'],
        previousComments[0][1].filter(
          (comment) => !checkedItems.includes(comment.id),
        ),
      )

      return { previousComments }
    },
    onSuccess: () => {
      toast.success('댓글 삭제 완료')
    },
    onError: (err, _, context) => {
      toast.error('잠시 후 다시 시도해주세요')
      queryClient.setQueriesData(['myComments'], context.previousComments)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['myComments'] })
    },
  })

  return { deleteComments, isDeleting }
}

export const useDeleteCommentMutation = (id: number) => {
  const queryClient = useQueryClient()
  const { mutate: deleteComment, isPending: isDeleting } = useMutation<
    void,
    Error
  >({
    mutationFn: () => fetchDeleteComment(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['myComments'] })
      const previousComments = queryClient.getQueriesData(['myComments'])
      queryClient.setQueriesData(
        ['myComments'],
        previousComments[0][1].filter((comment) => comment.id !== id),
      )
      return { previousComments }
    },
    onSuccess: () => {
      toast.success('댓글 삭제 완료')
    },
    onError: () => {
      toast.error('잠시 후 다시 시도해주세요')
      queryClient.setQueriesData(['myComments'], context.previousComments)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['myComments'] })
    },
  })

  return { deleteComment, isDeleting }
}

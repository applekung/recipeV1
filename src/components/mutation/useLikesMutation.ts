import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import {
  fetchAddLike,
  fetchDeleteLike,
  fetchDeleteLikes,
} from '../../fetch/fetchcUpdateLikes'
import { useStore, StoreState } from '../store/store'

export const useDeleteLikesMutation = (
  checkedItems: number[],
  setCheckedItems: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  const { toggleLikedRecipe }: StoreState = useStore()
  const { mutate: deleteRecipes, isPending: isDeleting } = useMutation<
    void,
    Error
  >({
    mutationFn: () => fetchDeleteLikes(checkedItems),
    onMutate: () => {
      checkedItems.forEach((id) => toggleLikedRecipe(id))
    },
    onSuccess: () => {
      toast.success('찜하기 목록에서 삭제')
      setCheckedItems([])
    },
    onError: () => {
      toast.error('잠시 후 다시 시도해주세요')
      checkedItems.forEach((id) => toggleLikedRecipe(id))
    },
  })

  return { deleteRecipes, isDeleting }
}

export const useDeleteLikeMutation = (id: number) => {
  const { toggleLikedRecipe }: StoreState = useStore()
  const { mutate: deleteRecipe, isPending: isDeleting } = useMutation<
    void,
    Error,
    string
  >({
    mutationFn: (id: number) => fetchDeleteLike(id),
    onMutate: (id: number) => {
      console.log(id)
      toggleLikedRecipe(id)
    },
    onSuccess: () => {
      toast.success('찜하기 목록에서 삭제')
    },
    onError: () => {
      toast.error('잠시 후 다시 시도해주세요')
      toggleLikedRecipe(id)
    },
  })

  return { deleteRecipe, isDeleting }
}

export const useToggleLikeMutation = (id: number) => {
  const { toggleLikedRecipe, isLiked }: StoreState = useStore()
  const { mutate: toggleRecipeLiked } = useMutation<void, Error, number>({
    mutationFn: () => (isLiked(id) ? fetchAddLike(id) : fetchDeleteLike(id)),
    onMutate: () => {
      toggleLikedRecipe(id)
    },
    onSuccess: () => {
      isLiked(id)
        ? toast.success('찜하기 추가 완료!')
        : toast.success('찜하기 취소 완료!')
    },
    onError: () => {
      toggleLikedRecipe(id)
      toast.error('잠시 후 다시 시도해주세요')
    },
  })

  return { toggleRecipeLiked }
}

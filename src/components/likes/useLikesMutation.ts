import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import toast from 'react-hot-toast'
import {
  fetchAddLike,
  fetchDeleteLike,
  fetchDeleteLikes,
} from '../../fetch/fetchcUpdateLikes'
import { useStore, LikedState } from '../store/store'

export const useDeleteLikesMutation = (
  checkedItems: string[],
  setCheckedItems: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  const { toggleLikedRecipe }: LikedState = useStore()
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
      console.error()
      toast.error('잠시 후 다시 시도해주세요')
      checkedItems.forEach((id) => toggleLikedRecipe(id))
    },
  })

  return { deleteRecipes, isDeleting }
}

export const useDeleteLikeMutation = (id: string) => {
  const { toggleLikedRecipe }: LikedState = useStore()
  const { mutate: deleteRecipe, isPending: isDeleting } = useMutation<
    void,
    Error,
    string
  >({
    mutationFn: (id: string) => fetchDeleteLike(id),
    onMutate: (id: string) => {
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

export const useToggleLikeMutation = (id: string) => {
  const { toggleLikedRecipe, isLiked }: LikedState = useStore()
  const { mutate: toggleRecipeLiked } = useMutation<void, Error, string>({
    mutationFn: () => (isLiked(id) ? fetchAddLike(id) : fetchDeleteLike(id)),
    onMutate: () => {
      console.log(id)
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

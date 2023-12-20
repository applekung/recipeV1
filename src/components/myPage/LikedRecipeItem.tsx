import React from 'react'
import { Link } from 'react-router-dom'
import { IoStar } from 'react-icons/io5'
import { IoIosStar } from 'react-icons/io'
import { GoComment } from 'react-icons/go'
import { FaHeart } from 'react-icons/fa'
import { useStore, LikedState } from '../../components/store/store'
import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import fetchToggleLikes from '../../fetch/fetchToggleLikes'
import { TempRecipe } from '../../fetch/APIResponsesTypes'

const LikedRecipeItem = ({ recipe }: TempRecipe, isLikedPage: boolean) => {
  const { toggleLikedRecipe, isLiked }: LikedState = useStore()

  const { mutate } = useMutation({
    mutationFn: () => fetchToggleLikes(recipe.id, isLiked(recipe.id)),
    onMutate: () => {
      toggleLikedRecipe(recipe.id)
    },
    onSuccess: () => {
      isLiked(recipe.id)
        ? toast.success('찜하기 추가 완료!')
        : toast.success('찜하기 취소 완료!')
    },
    onError: () => {
      toggleLikedRecipe(recipe.id)
      toast.error('잠시 후 다시 시도해주세요')
    },
  })

  return (
    <div className="flex gap-3">
      {/* <div className="w-20 h-20"> */}
      <img
        className="w-20 h-20 object-cover"
        src={
          'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fCVFQyU5QSU5NCVFQiVBNiVBQ3xlbnwwfHwwfHx8MA%3D%3D'
        }
        alt={`${recipe.title}의 메인이미지`}
      />
      {/* </div> */}
      <div className="flex flex-col">
        <div>{recipe.title}</div>
        <div>{recipe.userId}</div>
        <div>{new Date().toString()}</div>
      </div>
      <button
        onClick={() => {
          mutate(recipe.id)
        }}
      >
        X
      </button>
    </div>
  )
}

export default LikedRecipeItem

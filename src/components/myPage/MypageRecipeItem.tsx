import React from 'react'
import { TempRecipe } from '../../fetch/APIResponsesTypes'
import { useDeleteLikeMutation } from '../mutation/useLikesMutation'
import moment from 'moment'

const MypageRecipeItem = ({ recipe }: TempRecipe) => {
  const { deleteRecipe, isDeleting } = useDeleteLikeMutation(recipe.id)
  const recipeDate = new Date()
  const momentDate = moment(recipeDate)
  const formattedDate = momentDate.format('YYYY-MM-DD, h:mm')
  return (
    <div className="flex gap-3">
      <img
        className="w-20 h-20 object-cover"
        src={
          'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fCVFQyU5QSU5NCVFQiVBNiVBQ3xlbnwwfHwwfHx8MA%3D%3D'
        }
        alt={`${recipe.title}의 메인이미지`}
      />

      <div className="flex flex-col">
        <div>{recipe.title}</div>
        <div>유저아이디{recipe.userId}</div>
        <div>{formattedDate}</div>
      </div>
      <button
        onClick={() => {
          deleteRecipe(recipe.id)
        }}
        disabled={isDeleting}
      >
        X
      </button>
    </div>
  )
}

export default MypageRecipeItem

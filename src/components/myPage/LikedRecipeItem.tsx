import React from 'react'
import { TempRecipe } from '../../fetch/APIResponsesTypes'

const LikedRecipeItem = ({ recipe }: TempRecipe) => {
  return (
    <div className="flex gap-3">
      <div className="w-20 h-20">
        <img
          src={
            'https://cdn.pixabay.com/photo/2022/05/20/08/55/pasta-7209002_640.jpg'
          }
          alt={`${recipe.title}의 메인이미지`}
          className="object-cover w-full h-60 duration-1000 group-hover:scale-125"
        />
      </div>
      <div className="flex flex-col">
        <div>{recipe.title}</div>
        <div>{recipe.userId}</div>
        <div>{new Date().toString()}</div>
      </div>
    </div>
  )
}

export default LikedRecipeItem

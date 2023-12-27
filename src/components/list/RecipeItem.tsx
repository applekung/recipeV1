import React from 'react'
import { Link } from 'react-router-dom'
import { IoIosStar } from 'react-icons/io'
import { GoComment } from 'react-icons/go'
import { FaHeart } from 'react-icons/fa'
import { useStore, StoreState } from '../../components/store/store'
import { useToggleLikeMutation } from '../mutation/useLikesMutation'
import { RecipeCard } from '../../fetch/APIResponsesTypes'

const RecipeItem = ({ recipe }: { recipe: RecipeCard }) => {
  const { isLiked }: StoreState = useStore()

  const { toggleRecipeLiked } = useToggleLikeMutation(recipe.recipeId)

  return (
    <div className="relative">
      <Link to={`/detail/${recipe.recipeId}`}>
        <div className="flex flex-col group relative overflow-hidden">
          <div className="overflow-hidden rounded w-full h-60">
            <img
              src={recipe.image}
              alt={`${recipe.recipeName}의 메인이미지`}
              className="object-cover w-full h-60 duration-1000 group-hover:scale-125"
            />
          </div>
          <div>
            <div className="text-base font-medium">{recipe.recipeName}</div>
            <div className="text-sm text-gray-600">{recipe.userId}</div>
            <div className="flex gap-2">
              <div>
                <IoIosStar className="inline-block mb-0.5 mr-0.5 text-primary" />
                <span className="text-xs font-bold text-gray-700">
                  {recipe.aveStar}
                </span>
              </div>
              <div>
                <GoComment className="inline-block mr-0.5" />
                <span className="text-xs font-medium text-gray-600">
                  {recipe.reviews?.length ?? 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <button
        style={{
          position: 'absolute',
          top: '0',
          right: '-0.5rem',
          borderRadius: '50%',
        }}
      >
        <FaHeart
          onClick={() => {
            toggleRecipeLiked(recipe.recipeId)
          }}
          className={
            isLiked(recipe.recipeId)
              ? 'w-7 h-7 mt-1 mr-3 text-primary'
              : 'w-7 h-7 mt-1 mr-3 text-lightgray'
          }
        />
      </button>
    </div>
  )
}

export default RecipeItem

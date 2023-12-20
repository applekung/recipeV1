import React, { useEffect, useState } from 'react'
import { fetchRecipeListById } from '../../fetch/fetchRecipeLiked'
import { useStore, LikedState } from '../../components/store/store'
import LikedRecipeItem from '../../components/myPage/LikedRecipeItem'
import { TempRecipe } from '../../fetch/APIResponsesTypes'
import { TbMinusVertical } from 'react-icons/tb'
import { useMutation } from '@tanstack/react-query'
import fetchDeleteLikes from '../../fetch/fetchDeletLikes'
import toast from 'react-hot-toast'
import RecipeItem from '../../components/list/RecipeItem'

const LikedRecipes = () => {
  const { likedRecipes }: LikedState = useStore()
  const [recipeList, setRecipeList] = useState<TempRecipe[]>([])
  const [checkedItems, setCheckedItems] = useState<string[]>([])
  const { toggleLikedRecipe, isLiked }: LikedState = useStore()

  const { mutate, isLoading: isDeleting } = useMutation({
    mutationFn: () => fetchDeleteLikes(checkedItems),
    onMutate: () => {
      checkedItems.map((id) => toggleLikedRecipe(id))
    },
    onSuccess: () => {
      toast.success('찜하기 목록에서 삭제')
      setCheckedItems([])
    },
    onError: () => {
      toast.error('잠시 후 다시 시도해주세요')
      checkedItems.map((id) => toggleLikedRecipe(id))
    },
  })

  useEffect(() => {
    const fetchLikedRecipes = async () => {
      const fetchedRecipes = await fetchRecipeListById(likedRecipes)
      setRecipeList(fetchedRecipes)
    }

    fetchLikedRecipes()
  }, [likedRecipes])

  const handleSingleCheck = (checked, recipeId) => {
    setCheckedItems((prevCheckedItems) => {
      if (checked) {
        return [...prevCheckedItems, recipeId]
      } else {
        return prevCheckedItems.filter((id) => id !== recipeId)
      }
    })
  }

  const handleAllCheck = (checked) => {
    if (checked) {
      setCheckedItems(likedRecipes)
    } else {
      setCheckedItems([])
    }
  }

  const handelDelete = () => {
    mutate()
  }

  return (
    <div>
      <h2>찜한레시피({recipeList.length})</h2>
      <div className="flex flex-col justify-center w-full">
        <div>
          <input
            type="checkbox"
            checked={checkedItems.length === likedRecipes.length}
            onChange={(e) => handleAllCheck(e.target.checked)}
            disabled={likedRecipes.length === 0}
          />
          <span className="text-gray-900 text-lg font-semibold ml-2">
            전체선택
          </span>
          <TbMinusVertical className="text-gray-400 my-5 -ml-2 inline text-[1.5rem]" />
          <span
            onClick={() => handelDelete()}
            className="text-gray-900 my-5 text-lg font-semibold cursor-pointer"
          >
            선택삭제
          </span>
        </div>
        <div className="grid w-full max-w-6xl grid-cols-1 gap-x-6">
          {recipeList.length ? (
            recipeList.map((recipe) => (
              <div key={recipe.id} className="flex">
                <input
                  type="checkbox"
                  checked={!!checkedItems.includes(recipe.id)}
                  onChange={(e) =>
                    handleSingleCheck(e.target.checked, recipe.id)
                  }
                />
                <LikedRecipeItem recipe={recipe} isLikedPage={true} />
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

export default LikedRecipes

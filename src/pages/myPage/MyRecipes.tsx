import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { RecipeCard } from '../../fetch/APIResponsesTypes'
import fetchMyRecipe from '../../fetch/fetchMyRecipes'
import { TbMinusVertical } from 'react-icons/tb'
import MypageRecipeItem from '../../components/myPage/MypageRecipeItem'
import {
  useDeleteRecipeMutation,
  useDeleteRecipesMutation,
} from '../../components/mutation/useMyRecipesMutation'

function MyRecipes() {
  const userId = 1
  const [recipeList, setRecipeList] = useState<RecipeCard[]>([])
  const [checkedItems, setCheckedItems] = useState<number[]>([])

  useEffect(
    () => () => {
      setCheckedItems([])
    },
    [],
  )

  const { data, isLoading, isError } = useQuery<RecipeCard[]>({
    queryKey: ['myRecipes'],
    // 유저 아이디는 fetchFn에서 store에서
    queryFn: fetchMyRecipe,
  })

  const { deleteRecipes, isDeleting } = useDeleteRecipesMutation(
    checkedItems,
    setCheckedItems,
  )

  if (isError) {
    throw new Error('나의 레시피 목록을 불러오는 중 오류가 발생했습니다.')
  }

  useEffect(() => {
    if (!isLoading && data && data?.length) {
      setRecipeList(data)
    }
  }, [isLoading, data])

  const handleSingleCheck = (checked, recipeId: number) => {
    setCheckedItems((prevCheckedItems) => {
      if (checked) {
        return [...prevCheckedItems, recipeId]
      }
      return prevCheckedItems.filter((id) => id !== recipeId)
    })
  }

  const handleAllCheck = (checked) => {
    if (checked) {
      setCheckedItems(recipeList.map((recipe) => recipe.recipeId))
      return
    }
    setCheckedItems([])
  }

  const handelDelete = () => {
    deleteRecipes(checkedItems)
  }

  return (
    <div className="w-full">
      <h2 className="text-lg font-bold">
        내가 작성한 레시피({recipeList.length})
      </h2>
      <div className="flex flex-col justify-center w-full">
        <div>
          <input
            type="checkbox"
            checked={checkedItems.length === recipeList.length}
            onChange={(e) => handleAllCheck(e.target.checked)}
            disabled={recipeList.length === 0}
          />
          <span className="text-gray-900 font-semibold ml-2">전체선택</span>
          <TbMinusVertical className="text-gray-400 my-5 -ml-2 inline text-[1.5rem]" />
          <button
            className="text-gray-900 my-5 font-semibold cursor-pointer"
            onClick={() => handelDelete()}
            disabled={isDeleting}
          >
            선택삭제
          </button>
        </div>
        <div className="grid w-full max-w-6xl grid-cols-1 gap-x-6">
          {recipeList.length ? (
            recipeList.map((recipe) => (
              <div key={recipe.recipeId} className="flex">
                <input
                  type="checkbox"
                  checked={!!checkedItems.includes(recipe.recipeId)}
                  onChange={(e) =>
                    handleSingleCheck(e.target.checked, recipe.recipeId)
                  }
                />
                <div className="ml-3 my-3">
                  <MypageRecipeItem recipe={recipe} />
                </div>
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

export default MyRecipes

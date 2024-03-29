import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ListBySearchAPIResponse,
  RecipeCard,
} from '../../fetch/APIResponsesTypes'
import RecipeItem from '../../components/list/RecipeItem'
import useIntersect from '../../components/list/useIntersect'
import { useQuery } from '@tanstack/react-query'
import fetchSearchRecipe from '../../fetch/fetchSearchRecipe'

function RankItem({ category }: { category: string }) {
  const [page, setPage] = useState(1)
  const items = 4
  const [recipes, setRecipes] = useState<RecipeCard[]>([])
  // const keyword = category

  const { data, isLoading, isError } = useQuery<RecipeCard[]>({
    queryKey: ['search', { category, items, page }],
    queryFn: fetchSearchRecipe,
    enabled: !!category,
  })

  useEffect(() => {
    if (data) setRecipes(data.slice(0, 4))
  }, [data, category])

  return (
    <div className="flex flex-col items-center mb-24">
      <div className="grid w-full max-w-5xl sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-x-6 sm:gap-y-6 ">
        {recipes.length ? (
          recipes.map((recipe, idx) => (
            <RecipeItem key={recipe.recipeId} recipe={recipe} />
          ))
        ) : (
          <div>"{category}" 인기레시피 4개</div>
        )}
      </div>
    </div>
  )
}

export default RankItem

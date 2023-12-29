import { useQuery } from '@tanstack/react-query'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import fetchSearchRecipe from '../../fetch/fetchSearchRecipe'
import {
  ListBySearchAPIResponse,
  RecipeCard,
} from '../../fetch/APIResponsesTypes'
import RecipeItem from '../../components/list/RecipeItem'
import useIntersect from '../../components/list/useIntersect'
import ErrorBoundary from '../../components/error/ErrorBoundary'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import { useStore, StoreState } from '../../components/store/store'

function RecipeSearchCategoryList() {
  const { category } = useParams<{ category: string }>()
  const [page, setPage] = useState(1)
  const items = 30
  const [recipes, setRecipes] = useState<RecipeCard[]>([])
  const { likedRecipes, toggleLikedRecipe }: StoreState = useStore()

  useEffect(() => {
    if (!category) {
      throw new Error('검색어를 입력해주세요')
    }
    setPage(1)
  }, [category])

  const { data, isLoading, isError } = useQuery<RecipeCard[]>({
    queryKey: ['search', { category, items, page }],
    queryFn: fetchSearchRecipe,
  })

  if (isError) {
    throw new Error(
      `${category}에 대한 레시피 데이터 로드중 문제가 발생했습니다`,
    )
  }

  const [isLoadingMore, setIsLoadingMore] = useState(false)

  useEffect(() => {
    if (!isLoading && !isError && data && data?.length) {
      setRecipes((prev) => [...prev, ...data])
      setIsLoadingMore(false)
    }
  }, [isLoading, isError, data])

  const intersectRef = useIntersect(
    async (entry, observer) => {
      observer.unobserve(entry.target)
      if (!isLoading && !isLoadingMore && data?.length === items) {
        setPage((prevPage) => prevPage + 1)
        setIsLoadingMore(true)
      }
      observer.observe(entry.target)
    },
    { threshold: 0.5 },
  )
  return (
    <div className="ml-20">
      {category} 카테고리 검색 결과({recipes.length})
      <div className="p-8 w-full flex flex-col items-center">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid w-full max-w-5xl sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-x-6 sm:gap-y-6 ">
            {recipes.length ? (
              recipes.map((recipe) => (
                <RecipeItem key={recipe.recipeId} recipe={recipe} />
              ))
            ) : (
              <div>"{category}" 검색 결과가 없습니다</div>
            )}
            <div
              ref={intersectRef}
              className="h-20 w-full bg-transparent"
            ></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchCategotyErrorBoundary() {
  return (
    <ErrorBoundary>
      <RecipeSearchCategoryList />
    </ErrorBoundary>
  )
}

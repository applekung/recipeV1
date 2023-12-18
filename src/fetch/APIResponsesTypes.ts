// FIXME 백엔드에서 전달받기 전이라, 일단 예시로 작성했습니다.

export interface Recipe {
  // 레시피 상세
  id: string
}

// 레시피 목록의 카드UI에 들어갈 자료
export interface RecipeCard {
  id: string
  title: string
  image: string
  userId: string
  postDate: Date
  avgRating: number
  reviewCnt: number
}

// 키워드로 검색 시
export interface ListBySearchAPIResponse {
  id: string
  recipe: RecipeCard[]
}

// 카테고리로 검색 시
export interface ListByCategoryAPIResponse {
  id: string
  mainCategory: string
  subCategory: string
  recipe: RecipeCard[]
}

import react from 'react'
import { useState, useEffect } from 'react'
import DetailHeader from '../components/detail/DetailHeader'
import DetailMainList from '../components/detail/DetailMainList'
import axios from 'axios'
import { IoIosMore } from 'react-icons/io'
import { Link, useParams } from 'react-router-dom'
import Comment from '../components/comment/Comment'
import '../../src/components/uploadRecipe/uploadRecipe.css'
import { realCategoryList } from '../../public/dummy'

function Detail() {
  // 방법 1번
  // const ingredientCategoryList = []
  // realCategoryList.map((item) => {
  //   if (item.categoryName?.indexOf("재료별") === 0) {
  //     ingredientCategoryList.push(item)
  //   }
  // })

  // console.log('ingredientCategoryList', ingredientCategoryList)

  // const ex = ingredientCategoryList.map((item) => {
  //   // item.categoryName
  //   console.log('item.categoryName 하위',item.categoryName)
  //   return item.categoryName.split("_")[1]
  // })

  // console.log("ex",ex)
  // 2번
  // const ingredientCategoryList = realCategoryList
  //   .filter((item) => {
  //     return item.categoryName?.indexOf('재료별') === 0
  //   })
  //   .map((item) => {
  //     return item.categoryName?.split('_')[1]
  //   })

  // const getCategory = async () => {
  //   try {
  //     const res = await axios.get(
  //       'http://kdt-sw-7-team06.elicecoding.com:3000/recipes/1',
  //     )
  //     return res.data
  //   } catch (e) {
  //     console.log('e', e)
  //   }
  // }

  // console.log('ingredientCategoryList', ingredientCategoryList)

  // const [inputValue, setInputValue] = useState<string>('')
  const [fetchData, setFetchData] = useState<RecipeDetail | null>(null)
  const [explaincontentList, setExplaincontentList] = useState<string[]>([])
  const [sequenceImgList, setSequenceImgList] = useState<string[]>([])
  const [ingredientNameList, setIngredientNameList] = useState<string[]>([])
  const [ingredientUnitList, setIngredientUnitList] = useState<string[]>([])
  const [myBlogContent, setMyBlogContent] = useState(true)
  const [showOptions, setShowOptions] = useState(false)

  // fetch data 타입 처리 우선적

  interface Step {
    des: string
    imgUrl: string
    stepNum: number
  }

  interface Ingredient {
    item: string
    unit: string
  }

  interface RecipeDetail {
    recipeId: number
    recipeName: string
    img: string
    portion: number
    leadTime: number
    level: number
    createdAt: string
    updatedAt: string
    deletedAt: string | null
    ingredient: Ingredient[]
    step: Step[]
    reviews: any[]
  }

  // const { recipeId } = useParams<{ recipeId: string }>()
    const { recipeId } = useParams()

  useEffect(() => {
    console.log('recipeId', recipeId)
    async function getData() {
      try {
        const res = await axios.get(
          `http://kdt-sw-7-team06.elicecoding.com:3000/recipes/${recipeId}`,
        )
        console.log('res data', res.data)
        setFetchData(res.data)
        if (res.data && res.data.step) {
          const step: Step[] = res.data.step
          const ingredient: Ingredient[] = res.data.ingredient
          const explainList: string[] = step.map((item) => item.des)
          const imgList: string[] = step.map((item) => item.imgUrl)
          const ingNameList: string[] = ingredient.map((item) => item.item)
          const ingUnitList: string[] = ingredient.map((item) => item.unit)
          setIngredientNameList(ingNameList)
          setIngredientUnitList(ingUnitList)
          setExplaincontentList(explainList)
          setSequenceImgList(imgList)
        }
      } catch (error) {
        console.error('Error fetching recipe data:', error)
      }
    }

    getData()
  }, [recipeId])

  const handleMoreClick = () => {
    setShowOptions(!showOptions)
  }

  const handleDeleteClick = async () => {
    try {
      const res = await axios.delete(
        `http://kdt-sw-7-team06.elicecoding.com:3000/recipes/${recipeId}`,
      )
      console.log('레시피 삭제', res)
    } catch (e) {
      console.log('삭제 실패', e)
    }
  }

  return (
    // 랜더링시 사용자가 클릭한 레시피에 해당하는 페이지 등장
    // id 를 활용해 레시피와 댓글 가져오기

    <div className="flex flex-col items-center justify-center bg-red-400 min-w-[480px]">
      <div className="w-5/6 bg-white h-90 flex flex-wrap items-center justify-center min-w-[800px]">
        <div>
          <button
            onClick={() => {
              setMyBlogContent(true)
            }}
            className="p-5"
          >
            내 글에 접속
          </button>
          <button
            onClick={() => {
              setMyBlogContent(false)
            }}
          >
            다른사람 글
          </button>
        </div>
        {myBlogContent && (
          <div className="w-full">
            <div
              className="float-right px-10 relative top-5"
              onClick={handleMoreClick}
            >
              <IoIosMore className="w-10 h-10 cursor-pointer" />
              {showOptions && (
                <div className="absolute right-6 bottom-8 bg-white border border-gray-300 shadow-md p-2">
                  <Link to={`/modify/${recipeId}`}>
                    <button className="block w-full text-left py-1 px-1 hover:bg-gray-100">
                      수정하기
                    </button>
                  </Link>
                  <button
                    className="block w-full text-left py-1 px-1 hover:bg-gray-100 text-red-500"
                    onClick={handleDeleteClick}
                  >
                    삭제하기
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        <DetailHeader fetchData={fetchData} />
        <DetailMainList
          explaincontentList={explaincontentList}
          sequenceImgList={sequenceImgList}
        />
        <Comment recipeId={recipeId} />
      </div>
    </div>
  )
}
export default Detail

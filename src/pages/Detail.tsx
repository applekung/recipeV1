import React, { ChangeEvent, useEffect } from 'react'
import { useState } from 'react'
import DetailHeader from '../components/detail/DetailHeader'
import DetailMainList from '../components/detail/DetailMainList'
import axios from 'axios'
import { IoIosMore } from 'react-icons/io'
import { Link, useParams } from 'react-router-dom'
import Comment from '../components/comment/Comment'
import '../../src/components/uploadRecipe/uploadRecipe.css'

function Detail() {
  // const [inputValue, setInputValue] = useState<string>('')
  const [fetchData, setFetchData] = useState()
  const [explaincontentList, setExplaincontentList] = useState([])
  const [sequenceImgList, setSequenceImgList] = useState([])
  const [ingredientNameList, setIngredientNameList] = useState([])
  const [ingredientUnitList, setingredientUnitList] = useState([])
  const [myBlogContent, setMyBlogContent] = useState(true)
  const [showOptions, setShowOptions] = useState(false)

  // fetch data 타입 처리 우선적

  const { recipeId } = useParams()

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          `http://kdt-sw-7-team06.elicecoding.com:3000/recipes/${recipeId}`,
        )

        setFetchData(res.data)
        if (res.data && res.data.step) {
          const step = res.data.step
          const ingredient = res.data.ingredient
          const explainList = step.map((item) => item.des)
          const imgList = step.map((item) => item.imgUrl)
          const ingNameList = ingredient.map((item) => item.item)
          const ingUnitList = ingredient.map((item) => item.unit)
          setIngredientNameList(ingNameList)
          setingredientUnitList(ingUnitList)
          setExplaincontentList(explainList)
          setSequenceImgList(imgList)
        }
      } catch (error) {
        console.error('Error fetching recipe data:', error)
      }
    }

    getData()
  }, [recipeId])

  type ReviewModel = {
    reviewId: string
    recipeId: number
    id: number
    start: number
    comment: string
    time: string
  }

  const handleMoreClick = () => {
    setShowOptions(!showOptions)
  }

  const handleEditClick = () => {
    // Handle the edit functionality
    console.log('Edit clicked')
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
                    <button
                      className="block w-full text-left py-1 px-1 hover:bg-gray-100"
                      onClick={handleEditClick}
                    >
                      Edit
                    </button>
                  </Link>
                  <button
                    className="block w-full text-left py-1 px-1 hover:bg-gray-100 text-red-500"
                    onClick={handleDeleteClick}
                  >
                    Delete
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
        <Comment />
      </div>
    </div>
  )
}
export default Detail

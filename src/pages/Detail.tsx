import React, { ChangeEvent, useEffect } from 'react'
import { useState } from 'react'
import { dummyData, reviewModel } from '../../public/dummy'
import DetailHeader from '../components/detail/DetailHeader'
import DetailMainList from '../components/detail/DetailMainList'
import DetailMainReview from '../components/detail/DetailMainReview'
import axios from 'axios'
import { IoIosMore } from 'react-icons/io'

function Detail() {
  const explaincontentList: string[] = dummyData.sequenceExplain
  const sequenceImgList: string[] = dummyData.sequenceImg

  const filterdCommentList = reviewModel.filter((_) => _.recipeId == 0)

  type ReviewModel = {
    reviewId: string
    recipeId: number
    id: number
    start: number
    comment: string
    time: string
  }

  const [inputValue, setInputValue] = useState<string>('')
  const [comments, setComments] = useState<ReviewModel[]>(filterdCommentList)

  // 본인이 작성한 글이라 가정
  const [myBlogContent, setMyBlogContent] = useState(true)

  // console.log("comments", comments);
  // console.log('review', filterdCommentList)

  function getInputValueHandler(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value)
  }

  function addCommentsHandler() {
    const previousCommentsList = [...comments]
    const dummyUserComments: ReviewModel = {
      reviewId: 'ceads',
      recipeId: 0,
      id: 1,
      start: 4,
      comment: inputValue,
      time: '하하',
    }
    previousCommentsList.push(dummyUserComments)
    setComments(previousCommentsList)
    setInputValue('')
  }

  const [showOptions, setShowOptions] = useState(false)

  const handleMoreClick = () => {
    setShowOptions(!showOptions)
  }

  const handleEditClick = () => {
    // Handle the edit functionality
    console.log('Edit clicked')
  }

  const handleDeleteClick = () => {
    // Handle the delete functionality
    console.log('Delete clicked')
  }

  async function getDetailData() {
    const res = await axios.get('/recipe/:recipeId')
  }

  useEffect(() => {
    getDetailData()
  }, [])

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
                  <button
                    className="block w-full text-left py-1 px-1 hover:bg-gray-100"
                    onClick={handleEditClick}
                  >
                    Edit
                  </button>
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
        <DetailHeader />
        <DetailMainList
          explaincontentList={explaincontentList}
          sequenceImgList={sequenceImgList}
        />
        <DetailMainReview totalReview={comments} />

        <div className="w-full min-w-[10rem] p-5 flex items-center justify-center">
          <div className="w-[7rem] h-[7rem] flex flex-wrap items-center justify-center text-4xl border-solid border-2 border-black-800">
            +
          </div>
          <div className="w-4/6 h-[7rem] flex items-center justify-center">
            <input
              value={inputValue}
              onChange={getInputValueHandler}
              className="min-w-[35rem] h-[7rem] border-solid border-2 border-black-600"
              placeholder="무엇이 궁금하신가요 댓글을 남겨주세요"
            />
            <button
              onClick={addCommentsHandler}
              className="border-solid w-[7rem] h-[7rem] border-2 border-black-600 p-6"
            >
              등록
            </button>
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  )
}
export default Detail

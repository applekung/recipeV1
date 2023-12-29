import React, { useEffect, useState, ChangeEvent, KeyboardEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function MainSearch() {
  const navigate = useNavigate()

  //검색 키워드 걸리게하기
  const [searchTerm, setSearchTerm] = useState<string>('')

  // 검색 버튼을 클릭했을 때 실행되는 함수
  const handleSearch = () => {
    // 검색어가 비어있지 않으면 URL에 검색어를 추가하고 해당 페이지로 이동
    if (searchTerm.trim() !== '') {
      navigate(`/search/${searchTerm.trim()}`)
      setSearchTerm('')
    } else {
      toast.error('검색어를 입력해주세요')
    }
  }

  // 검색어 입력 필드의 값이 변경될 때 실행되는 함수
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  // 검색어 입력 필드에서 Enter 키를 눌렀을 때 실행되는 함수
  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="search flex flex-col items-center">
      <div className="mt-14 mb-2 font-black text-5xl">FIND A RECIPE</div>
      <div className="mx-4 my-4 w-[40rem] h-10 p-1.5 rounded-full border border-solid space-between">
        <input
          type="text"
          placeholder="검색어를 입력해주세요"
          className="items-center border-none outline-none mx-6"
          size={65}
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button
          id="submit"
          aria-label="submit"
          className=""
          onClick={handleSearch}
        >
          <img
            src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png"
            className="w-4 top-2 right-3 ml-10 justify-end"
            alt="search"
          />
        </button>
      </div>
    </div>
  )
}

export default MainSearch

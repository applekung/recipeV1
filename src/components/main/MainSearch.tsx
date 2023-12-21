import React from "react"
import { Link, useNavigate } from "react-router-dom"

function MainSearch() {
  return (
    <div className="search flex flex-col items-center">
      <div className="mt-14 mb-7 font-black text-5xl">FIND A RECIPE</div>
      <div className="mx-4 my-4 w-[40rem] h-10 p-1.5 rounded-full border border-solid space-between">

        <input
          type="text"
          placeholder="검색어를 입력해주세요"
          className="items-center border-none outline-none mx-6"
          size={65}
        />

        <Link to="/search">
          <button id="submit" aria-label="submit" className="">
            <img
              src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png"
              className="w-4 top-2 right-3 m-0 ml-10 justify-end"
            />
          </button>
        </Link>
      </div>
    </div>
  )
}

export default MainSearch;
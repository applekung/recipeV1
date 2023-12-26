import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
// import useUserStore from './userStore'
import { useStore } from '../store/store'
import axios from 'axios'
import { QueryFunction } from '@tanstack/react-query'
import { dummyCategoriesData } from '../../../public/dummy'
import './navbar.css'
import MainSearch from '../main/MainSearch'
import { Toast } from 'react-hot-toast'
// import { create } from 'zustand';

function Header() {
  //카테고리 navbar 더미데이터 가져오기
  dummyCategoriesData.map((item) => {})

  //categoryParent=null 필터링해서 상위카테고리로 만들기
  const topCatetory = dummyCategoriesData.filter(
    (dummyCategoriesData) => dummyCategoriesData.categoryParent === 'null',
  )

  const ingredientCategory = dummyCategoriesData.filter(
    (dummyCategoriesData) =>
      dummyCategoriesData.categoryParent === topCatetory[0].categoryName,
  )

  const situationCategory = dummyCategoriesData.filter(
    (dummyCategoriesData) =>
      dummyCategoriesData.categoryParent === topCatetory[1].categoryName,
  )

  // API에서 데이터
  interface Category {
    categoryId: number
    categoryName: string
    categoryParent: string
  }

  // 카테고리 navbar API 가져오기
  // async function getCategoryData(): Promise<Category[]> {
  //   try {
  //     const res = await axios.get('http://kdt-sw-7-team06.elicecoding.com/category');
  //     console.log('APIsadasdasd 성공', res);
  //     return res.data // 데이터를 Category 배열 타입으로 캐스팅
  //     console.log("이건 또 왜 안뜨냐")
  //     console.log('res.data: ', res.data)
  //   } catch (error) {
  //     console.error('API 실패', error);
  //     throw error; // 필요시 에러를 다시 던질 수 있습니다.
  //   }
  // }

  // getCategoryData()
  //   .then(apiResponse => {
  //     // "categoryParent"가 "null"인 항목 필터링
  //     // console.log("필터링")
  //     const topLevelCategories = apiResponse.filter(category => category.categoryParent === null);
  //     console.log('필터링된 결과:', topLevelCategories);
  //   })
  //   .catch(error => {
  //     console.error('에러:', error);
  //   });

  //검색 키워드 걸리게하기
  const [searchTerm, setSearchTerm] = useState<string>('')

  // 검색 버튼을 클릭했을 때 실행되는 함수
  const handleSearch = () => {
    // 검색어가 비어있지 않으면 URL에 검색어를 추가하고 해당 페이지로 이동
    if (searchTerm.trim() !== '') {
      navigate(`/search/${searchTerm.trim()}`)
      setSearchTerm('')
    } else {
      //경고창 뜨게 하기
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

  //마이페이지, 글쓰기 아이콘 로그인 판별
  const { getAccessToken } = useStore() // Destructure getAccessToken from your store
  const accessToken = getAccessToken()
  // const { administration } = useUserStore()
  const navigate = useNavigate()

  console.log('Token:', accessToken)

  const mypageIconClick = () => {
    if (accessToken) {
      // 토큰이 존재하면 로그인된 상태로 간주
      navigate('/search') //마이페이지로 주소변경 필요
      console.log('회원-로그인화면 이동')
    } else {
      navigate('/Login') //주소변경 필요
      console.log('비회원-로그인페이지 이동')
    }
  }

  const writingIconClick = () => {
    if (accessToken) {
      // 토큰이 존재하면 로그인된 상태로 간주
      navigate('/uploadrecipe') //글 쓰기 페이지 주소변경 필요
    } else {
      // 토큰이 존재하지 않으면 로그인 페이지로 이동
      navigate('/Login')
    }
  }

  //검색바 스크롤
  const [isVisible, setIsVisible] = useState(true)
  const [isMain, setIsMain] = useState<boolean>()
  const [height, setHeight] = useState(0)
  // const headerRef = useRef(null);
  //메인 페이지 인지 확인 path===/

  const { pathname } = useLocation()
  useEffect(() => {
    setIsMain(pathname === '/')
  }, [pathname])
  console.log('isMain')
  console.log(isMain)
  // const [hasMainSearch, setHasMainSearch] = useState(true);

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll)
    return () => window.removeEventListener('scroll', listenToScroll)
  }, [])

  const listenToScroll = () => {
    let heightToHideFrom = 200
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop
    setHeight(winScroll)

    if (isMain) {
      if (winScroll < heightToHideFrom) {
        isVisible && setIsVisible(false) //Hidden
      } else {
        setIsVisible(true) //스크롤 올라가면 다시 나타나게하기
        // if (headerRef.current) {
        //   // headerRef.current.classList.remove('hidden');
        // }
      }
    }
  }

  return (
    <div className="w-[1024px] flex items-center mx-auto">
      <div
        id="header"
        className="flex pt-1 items-center w-full justify-between bg-white"
      >
        <div className="logo ml-1">
          <Link to="/">
            <img
              className="w-40"
              src="./src/assets/common/logo.png"
              alt="logo"
            />
          </Link>
        </div>
        {/* <div className="HSB mx-4 my-4 w-60 h-10 p-1.5 rounded-full border border-solid space-between">
        <input
          type="text"
          placeholder="검색어를 입력해주세요"
          className="items-center border-none outline-none ml-4 text-xs"
          size={25}
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button id="submit" aria-label="submit" className="" onClick={handleSearch}>
        <Link to={`/search/${searchTerm.trim()}`}>
            <img
              src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png"
              className="w-4 top-2 right-3 m-0 ml-5 justify-end"
              alt="search"
            />
          </Link>
        </button>
      </div> */}

        {/* 스크롤 적용 수정코드 */}
        {isVisible && (
          <div id="hide">
            <div className="HSB ml-10 my-4 w-60 h-10 p-1.5 rounded-full border border-solid space-between">
              <input
                type="text"
                placeholder="검색어를 입력해주세요"
                className="items-center border-none outline-none ml-4 text-xs"
                size={25}
                value={searchTerm}
                onChange={handleInputChange}
                // onKeyPress={handleKeyPress}
              />
              <button
                id="submit"
                aria-label="submit"
                className=""
                onClick={handleSearch}
              >
                <Link to={`/search/${searchTerm.trim()}`}>
                  <img
                    src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png"
                    className="w-4 top-2 right-3 m-0 ml-5 justify-end"
                    alt="search"
                  />
                </Link>
              </button>
            </div>
          </div>
        )}

        {/* navbar 카테고리 */}
        <ul className="navbar items-center flex ml-auto text-lg font-bold">
          <li>
            <Link to="/">
              <span className="mx-7 cursor-pointer">레시피</span>
            </Link>
          </li>
          <li>
            <div className="dropdown">
              <button className="dropbtn">
                {topCatetory[0]?.categoryName}
              </button>
              <div className="dropdown-content">
                {ingredientCategory.map((item) => {
                  return (
                    <>
                      <Link
                        to={`/category/${item.categoryName}`}
                        className="block px-4 py-1 "
                      >
                        {item.categoryName}
                      </Link>
                    </>
                  )
                })}
              </div>
            </div>
          </li>
          <li>
            <div className="dropdown">
              <button className="dropbtn">
                {topCatetory[1]?.categoryName}
              </button>
              <div className="dropdown-content">
                {situationCategory.map((item) => {
                  return (
                    <>
                      <Link
                        to={`/category/${item.categoryName}`}
                        className="block px-4 py-1 "
                      >
                        {item.categoryName}
                      </Link>
                    </>
                  )
                })}
              </div>
            </div>
          </li>
          <li>
            <Link to="/category/크리스마스">
              <span className="mx-7 cursor-pointer">SPECIAL</span>
            </Link>
          </li>
        </ul>
        <span className="justify-end">|</span>

        {/* 마이페이지/글쓰기 아이콘 */}
        <div className="flex items-center justify-end">
          <div className="dropdown">
            <button className="dropbtn">
              <img
                className="mr-2"
                src="./src/assets/ico_user.png"
                alt=""
                onClick={mypageIconClick}
              />
            </button>
            {accessToken && (
              <div className="dropdown-content">
                <Link to="/" className="block px-3 py-1 ">
                  마이페이지
                </Link>
                <Link to="/" className="block px-4 py-1 ">
                  로그아웃
                </Link>
              </div>
            )}
          </div>
          <Link to="/">
            <img
              className="mr-1"
              src="./src/assets/rcp_write.png"
              alt=""
              onClick={writingIconClick}
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Header

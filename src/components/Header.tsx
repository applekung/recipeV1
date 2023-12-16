import React from 'react';

function Header() {
  return (
    <div id="header" className="flex mx-52 mt-3 items-center">
      <div className="logo">
        <img className="w-40" src="../assets/logo.png" alt="logo" />
      </div>
      <div className="search pl-3.5 w-60 h-9">
        <input
          id="gnb_search"
          placeholder="검색어를 입력해주세요"
          className="text-xs items-center bg-neutral-100"
        />
        <button id="submit" aria-label="submit" className=""></button>
      </div>

      <ul className="navbar items-center flex ml-8 text-lg font-bold">
        <li>
          <span className="mx-7 cursor-pointer">레시피</span>
        </li>
        <li>
          <span className="mx-7 cursor-pointer">재료별</span>
        </li>
        <li>
          <span className="mx-7 cursor-pointer">상황별</span>
        </li>
        <li>
          <span className="mx-7 cursor-pointer">SPECIAL</span>
        </li>
      </ul>
      <span className="mr-7">|</span>
      <div className="flex items-center">
        <img className="mr-4" src="../assets/ico_user.png" alt="" />
        <img className="mr-4" src="../assets/rcp_write.png" alt="" />
      </div>
      <div className="searchbar">
        <div className="my-10">어디로 가시나요?</div>
        <div>
          {/* 추가적인 내용 */}
        </div>
      </div>
    </div>
  );
}

export default Header;

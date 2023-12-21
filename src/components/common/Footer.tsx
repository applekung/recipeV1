import React from "react";

function Footer() {
    return (
        <div>
          <link rel="stylesheet" href="src\components\common\navbar.css"></link>
            <footer className="bg-gray-100 text-black p-4">
                <div className="container mx-auto  w-[64rem]">
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-2">
                        {/* 로고 */}
                        <div className="col-span-2 lg:col-span-1">
                            <img src="./src/assets/common/logo.png" alt="로고" className="w-24 h-auto" />
                        </div>
                        {/* 메뉴 */}
                        <div className="col-span-2 lg:col-span-4 flex flex-wrap items-center justify-end text-sm font-bold">
                            <div className="mb-2 lg:mb-0 mr-20"><a href="#">회사소개</a></div>
                            <div className="mb-2 lg:mb-0 mr-20"><a href="#">광고문의</a></div>
                            <div className="mb-2 lg:mb-0 mr-20"><a href="#">개인정보처리방침</a></div>
                            <div className="mb-2 lg:mb-0 mr-20"><a href="#">이용약관</a></div>
                            <div className="mb-2 lg:mb-0"><a href="#">고객센터</a></div>
                        </div>
                        {/* 연락처 및 주소 */}
                        <div className="col-span-2 mt-4 lg:col-span-5 lg:flex lg:justify-between text-xs">
                            <div className="mb-2 lg:w-1/2">
                                <p>대표: 박미카엘 / E: help@10000recipe.com / F: 02) 323-5049</p>
                                <p>서울 금천구 가산동 371-50 3차 1106-1호</p>
                                <p>문의전화(운영시간 평일 10:00~18:00)</p>
                            </div>
                            {/* 회사 정보 */}
                            <div className="mb-2 lg:col-span-5 lg:w-1/2 text-right">
                                <p>(주)레시피헤븐 / 사업자등록번호 291-81-02485 / 통신판매업신고 2022-서울금천-3089</p>
                                <p>서울지방중소기업청 제 031134233-1-01643호</p>
                                <p>Copyright 레시피헤븐 Inc. All Rights Reserved</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;

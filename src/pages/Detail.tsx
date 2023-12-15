import React from 'react'
import { FaRegClock } from 'react-icons/fa6'
import { IoIosPeople } from 'react-icons/io'
import { TbStarsFilled } from 'react-icons/tb'

function Detail() {
  return (
    <div className="flex items-center justify-center bg-gray-200 min-w-[30rem]">
      <div className="w-5/6 bg-white h-90 flex flex-wrap items-center justify-center">
        <div className="w-2/5 p-6 min-w-[25rem]">
          <img
            className="w-full h-[30rem]"
            src="../public/cake.jpeg"
            alt=""
          />
        </div>

        <div className="w-3/5 p-5">
          <div className="flex justify-between">
            <div className="text-2xl font-bold">
              요리명 : 크리스마스 케이크
            </div>
            <div className="flex justify-center items-center">
              <img className="w-[2rem]" src="../public/다운로드.png" alt="" />
              <h4 className="p-2">10개</h4>
            </div>
          </div>

          <div className="flex items-center justify-around p-5">
            <div className="flex items-center flex-col">
              <div className="p-7 text-4xl text-slate-500">
                <IoIosPeople style={{ height: 30 }} />
              </div>
              <p className="text-xs text-slate-500 font-bold">200인분</p>
            </div>
            <div className="flex items-center flex-col">
              <div className="p-7 text-3xl text-slate-500">
                <FaRegClock style={{ height: 30 }} />
              </div>
              <p className="text-xs text-slate-500 font-bold">20분</p>
            </div>
            <div className="flex items-center flex-col">
              <div className="p-7 text-3xl text-slate-500">
                <TbStarsFilled style={{ height: 30 }} />
              </div>
              <p className="text-xs text-slate-500 font-bold">
                초등학생도 가능
              </p>
            </div>
          </div>

          <div className="py-2">
            <p className="text-1xl py-4 font-extrabold">
              재료 및 분량 <span>(4인분)</span>
            </p>
            <div className="h-[14rem] bg-gray-100 p-7">
              닭에게 계란을 뺴앗아간다... 눈가가 붉어지며 안된다고 소리치는 닭에게서 계란을 기어코 뻇어간다... 
              그 계란을 풀고 미리 혼내준 버터에 넣는다... 또 거기에 설탕을 넣고 잘 녹인다. 미리 체쳐놓은 박력분
              그걸또 반죽한다. 크흑 무자비한놈들... 
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail

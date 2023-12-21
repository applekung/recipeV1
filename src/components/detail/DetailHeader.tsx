import React from 'react'
import { FaRegClock } from 'react-icons/fa6'
import { IoIosPeople } from 'react-icons/io'
import { TbStarsFilled } from 'react-icons/tb'
import {dummyData} from '../../../public/dummy'

function DetailHeader() {
  return (
    <div className="flex flex-wrap items-center justify-center min-w-[50rem]">
      <div className="w-2/5 p-6 min-w-[25rem]">
        {/* 서버에서 이미지 받아오기 */}
        <img
          className="w-full h-[30rem]"
          src="./src/assets/detail/cake.jpeg"
          alt=""
        />
      </div>
      <div className="w-3/5 p-8">
        <div className="w-full">
          <div className="flex justify-between">
            <div className="text-2xl font-bold">
              요리명 : {dummyData.recipeName}
            </div>
            <div className="flex justify-center items-center p-2">
              <img
                className="w-[2rem]"
                src="./src/assets/detail/다운로드.png"
                alt=""
              />
              <h4 className="p-1">{dummyData.Like}</h4>
            </div>
          </div>

          <div className="flex items-center justify-around p-1">
            <div className="flex items-center flex-col">
              <div className="p-7 text-4xl text-slate-500">
                <IoIosPeople style={{ height: 30 }} />
              </div>
              <p className="text-xs text-slate-500 font-bold">
                {dummyData.portion}
              </p>
            </div>
            <div className="flex items-center flex-col">
              <div className="p-7 text-3xl text-slate-500">
                <FaRegClock style={{ height: 30 }} />
              </div>
              <p className="text-xs text-slate-500 font-bold">
                {dummyData.leadTime}
              </p>
            </div>
            <div className="flex items-center flex-col">
              <div className="p-7 text-3xl text-slate-500">
                <TbStarsFilled style={{ height: 30 }} />
              </div>
              <p className="text-xs text-slate-500 font-bold">
                {dummyData.level}
              </p>
            </div>
          </div>
        </div>

        <div className="py-2">
          <p className="text-1xl py-4 font-extrabold">
            재료 및 분량{' '}
            <span className="text-orange-600">{dummyData.portion}</span>
          </p>
          <div className="h-[14rem] bg-gray-100 p-7 font-medium">
            <div className="flex w-full">
              {dummyData.ingredient.map((item, index) => {
                return (
                  <div key={index} className="p-2">
                    {item}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailHeader

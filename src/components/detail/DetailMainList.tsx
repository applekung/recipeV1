import React from 'react'

type DetailMainProps = {
  explaincontentList: string[]
  sequenceImgList: string[]
}

function DetailMain({ explaincontentList, sequenceImgList }: DetailMainProps) {
  return (
    <div className="flex flex-col bg-white w-full">
      {explaincontentList.map((item, index) => {
        console.log(sequenceImgList[index])
        return (
          <div key={index}>
            <FoodMakingList
              sequenseImgUrl={sequenceImgList[index]}
              explainText={item}
              index={index}
            />
          </div>
        )
      })}
    </div>
  )
}

type FoodMakingListProps = {
  sequenseImgUrl: string
  explainText: string
  index: number
}

function FoodMakingList({ sequenseImgUrl, explainText, index,}: FoodMakingListProps) {
  return (
    <div className="flex justify-center p-10 flex-wrap">
      <div className="w-3/12 min-w-[15rem]">
        <img
          className="w-[25rem] h-[15rem] rounded-2xl"
          src={sequenseImgUrl}
          alt=""
        />
      </div>
      <div className="w-9/12 px-10 py-5 flex">
        <div className="text-2xl w-10 h-10 bg-orange-600 flex items-center justify-center rounded-3xl">
          {index + 1}
        </div>
        <p className="px-5 m-2  min-w-[15rem]">{explainText}</p>
      </div>
    </div>
  )
}

export default DetailMain

import React from 'react'

// type DetailMainProps = {
//   explaincontentList: string[]
//   sequenceImgList: string[]
// }

function DetailMain({ explaincontentList, sequenceImgList }) {
  console.log('sequenceImgList', sequenceImgList)
  return (
    <div className="flex flex-col bg-white w-5/6">
      {explaincontentList.map((item, index) => {
        // console.log(sequenceImgList[index])
        // const imageIndex = index + 1
        return (
          <div key={index}>
            <FoodMakingList
              sequenseImgUrl={sequenceImgList[index]}
              // sequenseImgUrl={imageIndex}
              explainText={item}
              index={index}
            />
          </div>
        )
      })}
    </div>
  )
}

// type FoodMakingListProps = {
//   sequenseImgUrl: string
//   explainText: string
//   index: number
// }

function FoodMakingList({
  sequenseImgUrl,
  explainText,
  index,
}) {
  console.log('sequenseImgUrl', sequenseImgUrl)
  return (
    <>
      {sequenseImgUrl ? (
        <div className="flex  justify-center p-10 flex-wrap w-full">
          <div className="w-9/12 px-2 py-2 flex">
            <div className="text-2xl w-7 h-10 bg-orange-600 flex items-center justify-center rounded-3xl">
              {index + 1}
            </div>
            <p className="px-5 m-2  min-w-[15rem]">{explainText}</p>
          </div>
          <div className="w-3/12 min-w-[10rem]">
            <img
              className="w-[25rem] h-[15rem] rounded-2xl"
              // src={sequenseImgUrl}
              // src="../src/assets/common/logo.png"
              // src={`../src/assets/common/크리스마스/당근라페샌드위치/sandwich${sequenseImgUrl}.jpeg`}
              src={sequenseImgUrl}
              alt=""
            />
          </div>
        </div>
      ) : (
        <div className="flex  justify-center p-10 flex-wrap">
          <div className="w-9/12 px-10 py-5 flex">
            <div className="text-2xl w-10 h-10 bg-orange-600 flex items-center justify-center rounded-3xl">
              {index + 1}
            </div>
            <p className="px-5 m-2  min-w-[15rem]">{explainText}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default DetailMain

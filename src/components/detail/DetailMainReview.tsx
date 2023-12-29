import React from 'react'

type DetailMainReviewProps = {
  totalReview: string[]
}

function DetailMainReview({ totalReview }: DetailMainReviewProps) {
  return (
    <div className="w-full min-w-120px p-10">
      <p className="text-3xl font-bold py-2 border-b border-black">
        댓글 <span className="text-orange-500">{totalReview.length}</span>
      </p>
      {totalReview.map((item, index) => {
        return (
          <div
            key={index}
            className="w-full py-5 px-1 border-zinc-950 border-b border-black"
          >
            <div className="flex">
              <div className="text-orange-500">{item.reviewId}</div>
              <div className="px-3">{item.time}</div>
            </div>
            <div>{item.comment}</div>
          </div>
        )
      })}
    </div>
  )
}

export default DetailMainReview

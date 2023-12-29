import React, { ReactElement, useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'

interface StarRatingProps {
  selectedRating: number
  onRatingChange: (rating: number) => void
  readOnly: boolean
}

const StarRating = ({
  selectedRating,
  onRatingChange,
  readOnly,
}: StarRatingProps): ReactElement => {
  const [hoveredRating, setHoveredRating] = useState<number>(0)
  const totalStars = 5
  const [starRatingOnOff, setStarRatingOnOff] = useState<JSX.Element[]>([])

  const handleClick = (rating: number): void => {
    onRatingChange(selectedRating === rating ? 0 : rating)
  }

  const handleHover = (rating: number): void => {
    setHoveredRating(rating)
  }

  const resetHover = (): void => {
    setHoveredRating(0)
  }

  useEffect(() => {
    const tempStarRating: JSX.Element[] = []
    for (let i = 0; i < totalStars; i++) {
      const isFilled = i < selectedRating
      const isHovered = i < hoveredRating
      tempStarRating.push(
        <FaStar
          key={i}
          onClick={() => handleClick(i + 1)}
          onMouseEnter={() => handleHover(i + 1)}
          onMouseLeave={resetHover}
          className={`relative ml-auto text-lg ${
            isFilled || (!readOnly && isHovered)
              ? 'text-yellow-500'
              : 'text-gray-400'
          } ${
            isHovered && !readOnly
              ? 'transform scale-110'
              : 'transform scale-100'
          } ${!readOnly ? 'cursor-pointer' : ''}`}
        />,
      )
    }
    setStarRatingOnOff(tempStarRating)
  }, [selectedRating, hoveredRating])

  return (
    <div className="flex">
      {starRatingOnOff.map((starIcon, index) => (
        <span key={index}>{starIcon}</span>
      ))}
    </div>
  )
}

export default StarRating

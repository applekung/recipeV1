import React, { ReactElement, useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'

const StarRating = (): ReactElement => {
  const [selectedRating, setSelectedRating] = useState<number>(0)
  const [hoveredRating, setHoveredRating] = useState<number>(0)
  const totalStars = 5
  const [starRatingOnOff, setStarRatingOnOff] = useState<JSX.Element[]>([])

  const handleClick = (rating: number): void => {
    setSelectedRating(selectedRating === rating ? 0 : rating)
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
          style={{
            color: isFilled || isHovered ? '#ffc107' : '#e4e5e9',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            cursor: 'pointer',
          }}
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

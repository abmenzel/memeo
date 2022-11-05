import { Star } from 'lucide-react'
import React, { useEffect, useState } from 'react'

type StarsProps = {
	rating: number
	callback?: Function
	size?: number
}

const getOpacity = (idx: number, length: number, rating: number) => {
	const lower = idx / length
	const upper = (idx + 1) / length
	if (rating < lower) return 0
	if (rating >= upper) return 1
	else {
		const rel = (rating - lower) / (upper - lower)
		return rel
	}
}

const Stars = ({ rating, size = 18, callback }: StarsProps) => {
	const stars = [1, 2, 3, 4, 5]
	const [hovering, setHovering] = useState<number>(0)

	const handleMouseEnter = (idx: number) => {
		setHovering(idx)
	}

	const handleMouseLeave = () => {
		setHovering(0)
	}

	return (
		<div className={`${callback ? 'cursor-pointer' : ''} flex`}>
			{stars.map((star, idx) => {
				return callback ? (
					<Star
						onClick={() => callback(idx + 1)}
						onMouseEnter={() => handleMouseEnter(idx + 1)}
						onMouseLeave={() => handleMouseLeave()}
						key={idx}
						size={size}
						fill='black'
						fillOpacity={
							hovering > 0
								? idx + 1 <= hovering
									? 1
									: 0
								: getOpacity(idx, stars.length, rating)
						}
					/>
				) : (
					<Star
						key={idx}
						size={size}
						fill='black'
						fillOpacity={getOpacity(idx, stars.length, rating)}
					/>
				)
			})}
		</div>
	)
}

export default Stars

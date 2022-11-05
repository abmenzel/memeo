import { Star } from 'lucide-react'
import React from 'react'

type StarsProps = {
	rating: number
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

const Stars = ({ rating }: StarsProps) => {
	const stars = [1, 2, 3, 4, 5]

	return (
		<div className='flex'>
			{stars.map((star, idx) => {
				return (
					<Star
						key={idx}
						size={18}
						fill='black'
						fillOpacity={getOpacity(idx, stars.length, rating)}
					/>
				)
			})}
		</div>
	)
}

export default Stars

import { Star } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Card from '../models/Card'
import Confetti from './Confetti'

type StarsProps = {
	activeCard?: Card
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
		return rel ? rel : 0
	}
}

const Stars = ({ rating, size = 18, callback, activeCard }: StarsProps) => {
	const stars = [1, 2, 3, 4, 5]
	const [hovering, setHovering] = useState<number>(0)
	const [confetti, setConfetti] = useState<boolean>(false)

	const handleMouseEnter = (idx: number) => {
		setHovering(idx)
	}

	const handleMouseLeave = () => {
		setHovering(0)
	}

	useEffect(() => {
		if (confetti) {
			setTimeout(() => {
				setConfetti(false)
			}, 3500)
		}
	}, [confetti])

	return (
		<div className={`${callback ? 'cursor-pointer' : ''} flex`}>
			{stars.map((star, idx) => {
				return callback ? (
					<>
						<Star
							onClick={() => {
								if (idx + 1 == 5 && rating !== 1) {
									setConfetti(true)
								}
								callback(idx + 1)
							}}
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
						{confetti && <Confetti />}
					</>
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

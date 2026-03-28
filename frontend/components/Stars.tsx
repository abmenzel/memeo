import { Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import Card from '../models/Card'
import Confetti from './Confetti'

type StarsProps = {
	activeCard?: Card
	rating: number
	callback?: Function
	size?: string
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

const Stars = ({ rating, size = '1rem', callback }: StarsProps) => {
	const stars = [1, 2, 3, 4, 5]
	const [confetti, setConfetti] = useState<boolean>(false)

	useEffect(() => {
		if (confetti) {
			setTimeout(() => {
				setConfetti(false)
			}, 3500)
		}
	}, [confetti])

	return (
		<div className={`${callback ? 'cursor-pointer' : ''} flex`}>
			{stars.map((_, idx) => {
				return callback ? (
					<span key={idx}>
						<Star
							onClick={() => {
								if (idx + 1 == 5 && rating !== 1) {
									setConfetti(true)
								}
								if ((idx + 1) / stars.length === rating) {
									callback(0)
									return
								}
								callback(idx + 1)
							}}
							size={size}
							fill='black'
							fillOpacity={getOpacity(idx, stars.length, rating)}
						/>
						{confetti && <Confetti />}
					</span>
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

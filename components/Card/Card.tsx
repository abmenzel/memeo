import React from 'react'
import { CSSTransition } from 'react-transition-group'
import ICard from './ICard'

const Card = ({
	card,
	flipCard,
	editing,
}: {
	card: ICard
	flipCard: boolean
	editing: boolean
}) => {
	return (
		<div className='relative my-24 flex text-center w-full'>
			<div className='w-2xfull flex items-center overflow-x-hidden'>
				<div
					className={`w-full shrink-0 ${
						flipCard ? 'opacity-0 pointer-events-none' : ''
					}`}>
					<textarea
						readOnly={!editing}
						className={`${
							!editing && 'pointer-events-none'
						} text-center bg-transparent font-bold text-4xl transition-all`}
						defaultValue={card.front}
						value={card.front}
					/>
				</div>
				<div
					className={`w-full shrink-0 -translate-x-full ${
						!flipCard ? 'opacity-0 pointer-events-none' : ''
					} `}>
					<div className={`text-2xl transition-all`}>{card.back}</div>
				</div>
			</div>
		</div>
	)
}

export default Card

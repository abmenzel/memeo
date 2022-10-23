import { ArrowRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Card from '../Card/Card'
import ICard from '../Card/ICard'
import Toolbar from '../Toolbar/Toolbar'

const CardCarousel = ({ cards }: { cards: ICard[] }) => {
	const [activeCardIdx, setActiveCardIdx] = useState(0)
	const [flipCard, setFlipCard] = useState(false)
	const [editing, setEditing] = useState(false)
	const next = () => {
		const newCardIdx =
			activeCardIdx + 1 >= cards.length ? 0 : activeCardIdx + 1
		setFlipCard(false)
		setActiveCardIdx(newCardIdx)
	}

	const handleEditClick = () => {
		setEditing(!editing)
	}

	useEffect(() => {
		console.log(flipCard)
	})

	useEffect(() => {
		if (editing) {
		} else {
		}
	}, [editing])

	return (
		<div className='max-w-xl w-full'>
			<Card
				editing={editing}
				flipCard={flipCard}
				card={cards[activeCardIdx]}
			/>
			<Toolbar
				nextCard={next}
				setFlipCard={() => setFlipCard(!flipCard)}
				handleEditClick={handleEditClick}
				editing={editing}
			/>
		</div>
	)
}

export default CardCarousel

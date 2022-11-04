import { ArrowRight } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import Card from './Card'
import ICard from '../models/Card'
import Toolbar from './Toolbar'

const useFirstRender = () => {
	const firstRender = useRef(true)

	useEffect(() => {
		firstRender.current = false
	}, [])

	return firstRender.current
}

const CardCarousel = ({
	cards,
	setCards,
}: {
	cards: ICard[]
	setCards: Function
}) => {
	const [activeCardIdx, setActiveCardIdx] = useState(0)
	const [flipCard, setFlipCard] = useState(false)
	const [editing, setEditing] = useState(false)
	const firstRender = useFirstRender()
	const activeCardInputRef = useRef<any>()
	const next = () => {
		const newCardIdx =
			activeCardIdx + 1 >= cards.length ? 0 : activeCardIdx + 1
		setFlipCard(false)
		setActiveCardIdx(newCardIdx)
	}

	useEffect(() => {
		// New card was added
		if (firstRender) return
		setActiveCardIdx(cards.length - 1)
		setEditing(true)
	}, [cards.length])

	const newCard = () => {
		const newCards: ICard[] = [
			...cards,
			{
				front: '',
				back: '',
				rating: 0,
			},
		]
		setCards(newCards)
	}

	const handleEditClick = () => {
		console.log(activeCardInputRef.current)
		setEditing(!editing)
	}

	useEffect(() => {
		if (editing) {
			activeCardInputRef.current?.focus()
		}
	}, [editing])

	return (
		<div className='max-w-xl w-full'>
			{cards.length > 0 && (
				<Card
					activeCardInputRef={activeCardInputRef}
					setCards={setCards}
					editing={editing}
					flipCard={flipCard}
					cardIdx={activeCardIdx}
					cards={cards}
				/>
			)}
			<Toolbar
				nextCard={next}
				newCard={newCard}
				setFlipCard={() => setFlipCard(!flipCard)}
				handleEditClick={handleEditClick}
				editing={editing}
			/>
		</div>
	)
}

export default CardCarousel

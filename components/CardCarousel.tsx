import { ArrowRight } from 'lucide-react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Card from './Card'
import ICard from '../models/Card'
import Toolbar from './Toolbar'
import { AppContext } from '../context/app'
import { Types } from '../reducers/reducers'
import { createNewCard } from '../lib/api.utils'
import { updateCard } from '../lib/api'

const CardCarousel = () => {
	const { state, dispatch } = useContext(AppContext)
	const { activeDeck } = state
	const [activeCard, setActiveCard] = useState<ICard | null>(null)
	const [activeCardIdx, setActiveCardIdx] = useState(0)
	const [flipCard, setFlipCard] = useState(false)
	const [editing, setEditing] = useState<ICard | null>(null)
	const activeCardInputRef = useRef<any>()

	const [cards, setCards] = useState<ICard[]>([])

	useEffect(() => {
		if (!activeDeck) return
		setCards(activeDeck.cards)
	}, [activeDeck])

	useEffect(() => {
		const newActiveCard = cards[activeCardIdx]
		setActiveCard(newActiveCard)
	}, [activeCardIdx, cards])

	const next = () => {
		const newCardIdx =
			activeCardIdx + 1 >= cards.length ? 0 : activeCardIdx + 1
		setFlipCard(false)
		setActiveCardIdx(newCardIdx)
	}

	useEffect(() => {
		// New card was added
		//setActiveCardIdx(cards.length - 1)
		//setEditing(cards[cards.length - 1])
	}, [cards.length])

	const handleNewCard = () => {
		if (!state.activeDeck || !state.activeDeck.id) return

		const newCard = {
			id: null,
			deck_id: state.activeDeck.id,
			front: '',
			back: '',
			rating: 0,
		}

		createNewCard(dispatch, newCard)
	}

	const handleEdit = (event: React.MouseEvent) => {
		event.stopPropagation()
		if (editing) {
			setEditing(null)
		} else {
			console.log(cards[activeCardIdx])
			setEditing(cards[activeCardIdx])
		}
	}

	useEffect(() => {
		if (!activeCardInputRef.current || !activeCard || !activeDeck) return
		if (!editing) activeCardInputRef.current.blur()
		if (editing?.id == activeCard.id) {
			activeCardInputRef.current.focus()
		}
		if (
			!flipCard &&
			activeCard.front !== activeCardInputRef.current.value
		) {
			// Front was updated
			console.log('front was updated')

			const oldCard = activeDeck.cards[activeCardIdx]
			const newCard: ICard = {
				...oldCard,
				front: activeCardInputRef.current.value,
			}

			dispatch({
				type: Types.UpdateCard,
				payload: {
					oldCard: oldCard,
					newCard: newCard,
				},
			})

			updateCard(newCard)

			return activeCardInputRef.current.blur()
		} else if (
			flipCard &&
			activeCard.back !== activeCardInputRef.current.value
		) {
			// Back was updated
			console.log('back was updated')
			const oldCard = activeDeck.cards[activeCardIdx]
			const newCard: ICard = {
				...oldCard,
				back: activeCardInputRef.current.value,
			}

			dispatch({
				type: Types.UpdateCard,
				payload: {
					oldCard: oldCard,
					newCard: newCard,
				},
			})

			updateCard(newCard)

			return activeCardInputRef.current.blur()
		}
	}, [editing])

	return (
		<div className='max-w-xl w-full'>
			{cards.length > 0 && activeCard && (
				<Card
					card={activeCard}
					activeCardInputRef={activeCardInputRef}
					setEditing={setEditing}
					editing={editing}
					flipCard={flipCard}
				/>
			)}
			<Toolbar
				activeCard={cards[activeCardIdx]}
				nextCard={next}
				handleNewCard={handleNewCard}
				setFlipCard={() => setFlipCard(!flipCard)}
				handleEdit={handleEdit}
				editing={editing}
			/>
		</div>
	)
}

export default CardCarousel

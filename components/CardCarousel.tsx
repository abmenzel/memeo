import { PlusCircle } from 'lucide-react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Card from './Card'
import ICard from '../models/Card'
import Toolbar from './Toolbar'
import { AppContext } from '../context/app'
import arrayShuffle from 'array-shuffle'
import { cardIsEmpty, template } from '../lib/utils'
import { usePrevious } from '../hooks/usePrevious'
import Deck from '../models/Deck'

const CardCarousel = ({ deck }: { deck: Deck }) => {
	const { state, actions } = useContext(AppContext)
	const [activeCard, setActiveCard] = useState<ICard | null>(null)
	const [activeCardIdx, setActiveCardIdx] = useState(0)
	const [flipCard, setFlipCard] = useState(state.options.initialFlipState)
	const [editing, setEditing] = useState<ICard | null>(null)
	const activeCardInputRef = useRef<any>()

	const prevActiveCard: ICard | null = usePrevious<ICard | null>(activeCard)

	const [cards, setCards] = useState<ICard[]>(deck.cards)

	useEffect(() => {
		setCards(deck.cards)
	}, [deck.cards])

	useEffect(() => {
		setFlipCard(state.options.initialFlipState)
	}, [state.options.initialFlipState])

	const handleGlobalKey = (event: KeyboardEvent) => {
		if (document.activeElement != document.body) return
		switch (event.code) {
			case 'ArrowRight':
				next()
				return
			case 'ArrowLeft':
				prev()
				return
			case 'Space':
				setFlipCard(!flipCard)
				return
			case 'KeyE':
				setEditing(activeCard)
				return
			case 'KeyN':
				handleNewCard()
				return
		}
	}

	useEffect(() => {
		document.addEventListener('keyup', handleGlobalKey)
		return () => {
			document.removeEventListener('keyup', handleGlobalKey)
		}
	})

	useEffect(() => {
		const lastCard = cards[cards.length - 1]
		if (!lastCard) return
		if (cardIsEmpty(lastCard)) {
			setActiveCardIdx(cards.length - 1)
		}
	}, [cards.length])

	useEffect(() => {
		const newActiveCard = cards[activeCardIdx]
		setActiveCard(newActiveCard)
	}, [activeCardIdx, cards])

	useEffect(() => {
		if (!prevActiveCard || !activeCard) return
		if (
			cardIsEmpty(prevActiveCard) &&
			prevActiveCard.id !== activeCard.id
		) {
			actions.deleteCard(prevActiveCard)
		}
		if (cardIsEmpty(activeCard)) {
			setEditing(activeCard)
		}
	}, [activeCard])

	const next = () => {
		const newCardIdx = (activeCardIdx + 1) % cards.length
		setFlipCard(state.options.initialFlipState)
		setActiveCardIdx(newCardIdx)
	}
	const prev = () => {
		const newCardIdx =
			activeCardIdx - 1 < 0
				? cards.length - 1
				: (activeCardIdx - 1) % cards.length
		setFlipCard(state.options.initialFlipState)
		setActiveCardIdx(newCardIdx)
	}

	const handleNewCard = async () => {
		if (!deck.id) return
		const lastCard = cards[cards.length - 1]
		if (!lastCard) return
		if (cardIsEmpty(lastCard)) return
		actions.addCard(template.newCard(deck.id))
	}

	const handleShuffle = () => {
		const shuffledCards = arrayShuffle(cards)
		setCards(shuffledCards)
	}

	const handleEdit = (event: React.MouseEvent) => {
		event.stopPropagation()
		if (editing) {
			setEditing(null)
		} else {
			setEditing(cards[activeCardIdx])
		}
	}

	const handleNewRating = (newRating: number) => {
		const ratingRelative = (newRating - 0) / (5 - 0)
		if (!activeCard) return
		if (newRating !== activeCard.rating) {
			const newCard = {
				...activeCard,
				rating: ratingRelative,
			}
			actions.updateCard(newCard)
		}
	}

	useEffect(() => {
		if (!activeCardInputRef.current || !activeCard) return
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
			actions.updateCard({
				...activeCard,
				front: activeCardInputRef.current.value,
			})

			return activeCardInputRef.current.blur()
		} else if (
			flipCard &&
			activeCard.back !== activeCardInputRef.current.value
		) {
			// Back was updated
			console.log('back was updated')
			actions.updateCard({
				...activeCard,
				back: activeCardInputRef.current.value,
			})

			return activeCardInputRef.current.blur()
		}
	}, [editing])

	return (
		<div className='flex-grow flex flex-col max-w-xl w-full'>
			{cards.length > 0 ? (
				<>
					<div className='text-center text-xs'>
						{activeCardIdx + 1} / {deck.cards.length} cards
					</div>
					<div className='relative flex-grow flex flex-col items-center justify-center'>
						<div className='absolute max-w-md w-full mx-auto h-full'>
							<div
								onClick={prev}
								className='w-10 md:w-16 h-full absolute left-0 z-10'
							/>
							<div
								onClick={next}
								className='w-10 md:w-16 h-full absolute right-0 z-10'
							/>
						</div>

						{cards.length > 0 && activeCard && (
							<Card
								card={activeCard}
								setFlipCard={setFlipCard}
								activeCardInputRef={activeCardInputRef}
								setEditing={setEditing}
								editing={editing}
								flipCard={flipCard}
							/>
						)}
					</div>
					<Toolbar
						activeCard={cards[activeCardIdx]}
						activeCardIdx={activeCardIdx}
						handleNewRating={handleNewRating}
						nextCard={next}
						prevCard={prev}
						handleNewCard={handleNewCard}
						setFlipCard={() => setFlipCard(!flipCard)}
						handleEdit={handleEdit}
						handleShuffle={handleShuffle}
						editing={editing}
						setActiveCardIdx={setActiveCardIdx}
					/>
				</>
			) : (
				<div className='flex flex-col gap-y-4 text-center flex-grow items-center justify-center'>
					<p>This deck is empty.</p>
					<button className='btn-primary' onClick={handleNewCard}>
						<PlusCircle />
						Add card
					</button>
				</div>
			)}
		</div>
	)
}

export default CardCarousel

import arrayShuffle from 'array-shuffle'
import { AnimatePresence, motion } from 'framer-motion'
import { PlusCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/app'
import { usePrevious } from '../hooks/usePrevious'
import { cardIsEmpty, template } from '../lib/utils'
import ICard from '../models/Card'
import Deck from '../models/Deck'
import Card from './Card'
import Toolbar from './Toolbar'

const CardCarousel = ({ deck }: { deck: Deck }) => {
	const { state, actions } = useContext(AppContext)
	const [activeCard, setActiveCard] = useState<ICard | null>(null)
	const [activeCardIdx, setActiveCardIdx] = useState(0)
	const [flipCard, setFlipCard] = useState(state.options.initialFlipState)
	const [editing, setEditing] = useState<ICard | null>(null)
	const [direction, setDirection] = useState<'left' | 'right'>('right')
	const [activeInput, setActiveInput] = useState<HTMLTextAreaElement | null>(
		null
	)

	const prevActiveCard: ICard | null = usePrevious<ICard | null>(activeCard)

	const [cards, setCards] = useState<ICard[]>(deck.cards)

	const updateCard = async (card: ICard) => {
		const updatedCard = await actions.updateCard(card)
		setActiveCard(updatedCard)
	}

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
		if (!editing) return
		if (activeInput) {
			setTimeout(() => {
				activeInput.focus()
			}, 300) // wait for animation to finish
		}
	}, [editing])

	useEffect(() => {
		const lastCard = cards[cards.length - 1]
		if (!lastCard) return
		if (cardIsEmpty(lastCard)) {
			setActiveCardIdx(cards.length - 1)
		} else {
			setActiveCardIdx(0)
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
		if (editing) return
		const newCardIdx = (activeCardIdx + 1) % cards.length
		setDirection('right')
		setFlipCard(state.options.initialFlipState)
		setActiveCardIdx(newCardIdx)
	}
	const prev = () => {
		if (editing) return
		setDirection('left')
		setEditing(null)
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
		if (lastCard && cardIsEmpty(lastCard)) return
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
			updateCard(newCard)
		}
	}

	return (
		<div className='flex-grow flex flex-col max-w-xl w-full'>
			{cards.length > 0 ? (
				<>
					<AnimatePresence>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className='text-center text-xs'>
							{activeCardIdx + 1} / {deck.cards.length} cards
						</motion.div>
					</AnimatePresence>
					<AnimatePresence>
						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							className='relative flex-grow flex flex-col items-center justify-center'>
							{cards.length > 0 && activeCard && (
								<Card
									card={activeCard}
									setFlipCard={setFlipCard}
									updateCard={updateCard}
									direction={direction}
									setActiveInput={setActiveInput}
									setEditing={setEditing}
									editing={editing}
									flipCard={flipCard}
								/>
							)}
						</motion.div>
					</AnimatePresence>

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

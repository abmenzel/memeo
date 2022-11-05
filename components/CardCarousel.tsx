import { ArrowRight, PlusCircle } from 'lucide-react'
import React, {
	KeyboardEventHandler,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react'
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
	const [clicks, setClicks] = useState<number>(0)
	const [activeCardIdx, setActiveCardIdx] = useState(0)
	const [flipCard, setFlipCard] = useState(false)
	const [editing, setEditing] = useState<ICard | null>(null)
	const activeCardInputRef = useRef<any>()

	const [cards, setCards] = useState<ICard[]>([])

	const handleGlobalKey = (event: KeyboardEvent) => {
		if (document.activeElement != document.body) return
		console.log(event.code)
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
			case 'KeyN':
				handleNewCard()
		}
	}

	useEffect(() => {
		document.addEventListener('keyup', handleGlobalKey)
		return () => {
			document.removeEventListener('keyup', handleGlobalKey)
		}
	})

	useEffect(() => {
		if (!activeDeck) return
		setCards(activeDeck.cards)
	}, [activeDeck])

	useEffect(() => {
		// Always start at the latest added card
		setActiveCardIdx(cards.length - 1)
	}, [cards.length])

	useEffect(() => {
		const newActiveCard = cards[activeCardIdx]
		setActiveCard(newActiveCard)
	}, [activeCardIdx, cards])

	useEffect(() => {
		// If we arrive at an empty card start editing
		if (activeCard?.front === '') {
			setEditing(activeCard)
		}
	}, [activeCard])

	const next = () => {
		const newCardIdx = (activeCardIdx + 1) % cards.length
		setFlipCard(false)
		setActiveCardIdx(newCardIdx)
	}
	const prev = () => {
		const newCardIdx =
			activeCardIdx - 1 < 0
				? cards.length - 1
				: (activeCardIdx - 1) % cards.length
		setFlipCard(false)
		setActiveCardIdx(newCardIdx)
	}

	const handleNewCard = async () => {
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

	useEffect(() => {
		if (clicks > 1) {
			setEditing(activeCard)
			setClicks(0)
		}
	}, [clicks])

	return (
		<div className='flex-grow flex flex-col max-w-xl w-full'>
			{cards.length > 0 ? (
				<>
					<div
						onClick={() => setClicks(clicks + 1)}
						className='flex-grow flex flex-col justify-center'>
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
						nextCard={next}
						prevCard={prev}
						handleNewCard={handleNewCard}
						setFlipCard={() => setFlipCard(!flipCard)}
						handleEdit={handleEdit}
						editing={editing}
					/>
				</>
			) : (
				<div className='flex flex-col gap-y-4 text-center flex-grow items-center justify-center'>
					<p>This deck is empty.</p>
					<button
						className='btn-primary items-center flex gap-x-2'
						onClick={handleNewCard}>
						<PlusCircle />
						Add card
					</button>
				</div>
			)}
		</div>
	)
}

export default CardCarousel

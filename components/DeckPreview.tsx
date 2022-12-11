import React, {
	ChangeEvent,
	KeyboardEvent,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react'
import { AppContext } from '../context/app'
import Deck from '../models/Deck'
import DeckPreviewToolbar from './DeckPreviewToolbar'
import Stars from './Stars'
import Tag from './Tag'

type DeckPreviewProps = {
	deck: Deck
	editing: Deck | null
	setEditing: Function
	handleProps: any
}

const DeckPreview = (props: DeckPreviewProps) => {
	const { deck, editing, setEditing } = props
	const { actions } = useContext(AppContext)
	const [title, setTitle] = useState<string>(deck.title)
	const [deleting, setDeleting] = useState<boolean>(false)

	const titleRef = useRef<HTMLInputElement>(null)

	const handleEdit = (event: React.MouseEvent) => {
		event.stopPropagation()
		if (editing) {
			setEditing(null)
		} else {
			setEditing(deck)
		}
	}

	useEffect(() => {
		if (!titleRef.current) return
		if (editing?.id == deck.id) {
			titleRef.current.focus()
		} else if (deck.title !== titleRef.current.value) {
			setTitle(deck.title)
		}
	}, [editing, deck])

	useEffect(() => {
		if (!titleRef.current) return
		if (titleRef.current.value !== deck.title) {
			actions.updateDeck({ ...deck, title: titleRef.current.value })
		}
	}, [title])

	const handleKey = (event: KeyboardEvent): void => {
		if (!editing) return
		if (event.code === 'Enter' || event.code === 'Escape') {
			setEditing(false)
		}
	}

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value)
	}

	const handleBlur = () => {
		if (!editing) return
		setEditing(false)
	}

	const handleDelete = (event: React.MouseEvent) => {
		event.stopPropagation()
		actions.deleteDeck(deck)
		actions.deleteUnusedTags()
		setDeleting(false)
	}

	const handlePick = (event: React.MouseEvent) => {
		actions.pickDeck(deck)
	}

	const averageRating =
		deck.cards.reduce((acc, card) => acc + card.rating, 0) /
		deck.cards.length
	return (
		<div
			onClick={handlePick}
			className='group mb-0.5 border border-orange-150 btn-secondary py-2 flex justify-between items-center gap-x-8 w-full bg-orange-100'>
			<div className='flex flex-col min-w-0'>
				{deck.tag && <Tag className='text-[11px]' tag={deck.tag} />}
				<input
					ref={titleRef}
					onBlur={handleBlur}
					onKeyDown={handleKey}
					readOnly={!(editing?.id == deck.id)}
					className={`font-serif font-extrabold min-w-0 text-sm md:text-lg flex bg-transparent outline-none text-ellipsis ${
						!(editing?.id == deck.id) && 'pointer-events-none'
					}`}
					onChange={handleChange}
					value={title}
					placeholder='Deck Title'
				/>
				<p className='text-[11px]'>{deck.cards.length} cards</p>
			</div>
			<div className='flex items-center gap-x-1'>
				<Stars rating={averageRating} />
				<DeckPreviewToolbar
					deck={deck}
					deleting={deleting}
					editing={editing}
					handleEdit={handleEdit}
					handleDelete={handleDelete}
					setDeleting={setDeleting}
					handleProps={props.handleProps}
				/>
			</div>
		</div>
	)
}

export default DeckPreview

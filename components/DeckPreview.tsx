import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, {
	ChangeEvent,
	KeyboardEvent,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react'
import { AppContext } from '../context/app'
import { deleteDeck, updateDeck } from '../lib/api'
import Deck from '../models/Deck'
import { Types } from '../context/reducers'
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
	const { dispatch } = useContext(AppContext)
	const [title, setTitle] = useState<string>(deck.title)
	const [deleting, setDeleting] = useState<boolean>(false)
	const router = useRouter()

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
			const newDeck = { ...deck, title: titleRef.current.value }
			dispatch({
				type: Types.UpdateDeck,
				payload: {
					oldDeck: deck,
					newDeck: { ...deck, title: titleRef.current.value },
				},
			})
			updateDeck(newDeck)
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
		dispatch({
			type: Types.DeleteDeck,
			payload: deck,
		})
		deleteDeck(deck)
		setDeleting(false)
	}

	const handlePick = (event: React.MouseEvent) => {
		dispatch({
			type: Types.PickDeck,
			payload: deck,
		})
		router.push('/dojo')
	}

	const averageRating =
		deck.cards.reduce((acc, card) => acc + card.rating, 0) /
		deck.cards.length
	return (
		<div
			onClick={handlePick}
			className='group mb-0.5 border border-orange-150 btn-secondary py-2 flex justify-between items-center gap-x-8 w-full bg-orange-100'>
			<div className='flex flex-col min-w-0'>
				{deck.tag && <Tag tag={deck.tag} />}
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

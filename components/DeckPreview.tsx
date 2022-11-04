import {
	Check,
	Cross,
	Edit,
	Edit2,
	Edit3,
	Star,
	Trash,
	Trash2,
	X,
} from 'lucide-react'
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
import { Types } from '../reducers/reducers'
import Stars from './Stars'

type DeckPreviewProps = {
	deck: Deck
	editing: Deck | null
	setEditing: Function
}

const DeckPreview = ({ deck, editing, setEditing }: DeckPreviewProps) => {
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
		if (editing == deck) {
			titleRef.current.focus()
		} else if (deck.title !== titleRef.current.value) {
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
	}, [editing])

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

	const handleDeleting = (event: React.MouseEvent) => {
		event.stopPropagation()
		if (deleting) {
			setDeleting(false)
		} else {
			setDeleting(true)
		}
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

	return (
		<div
			onClick={handlePick}
			className='group btn-primary py-2 flex justify-between items-center gap-x-8 w-full'>
			<input
				ref={titleRef}
				onBlur={handleBlur}
				onKeyDown={handleKey}
				readOnly={!(editing == deck)}
				className={`font-bold text-lg flex items-center bg-transparent outline-none ${
					!(editing == deck) && 'pointer-events-none'
				}`}
				onChange={handleChange}
				value={title}
				placeholder='Deck Title'
			/>
			{deleting ? (
				<div className='flex items-center gap-x-2 flex-grow justify-end'>
					<p className='font-bold'>Delete ? </p>
					<button className='btn-primary' onClick={handleDelete}>
						<Check size={18} />
					</button>
					<button className='btn-primary' onClick={handleDeleting}>
						<X size={18} />
					</button>
				</div>
			) : (
				<div className='flex flex-grow justify-end gap-x-2 opacity-0 group-hover:opacity-100 transition-opacity'>
					<button className='btn-primary' onClick={handleEdit}>
						{editing ? <Check size={18} /> : <Edit3 size={18} />}
					</button>
					<button className='btn-primary' onClick={handleDeleting}>
						<Trash2 size={18} />
					</button>
				</div>
			)}
			<Stars rating={0.55} />
		</div>
	)
}

export default DeckPreview

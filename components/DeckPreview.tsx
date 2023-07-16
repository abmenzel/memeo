import { motion } from 'framer-motion'
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
	const [contextMenuOpen, setContextMenuOpen] = useState<boolean>(false)

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
		if (!contextMenuOpen) {
			actions.pickDeck(deck)
		}
	}

	const averageRating =
		deck.cards.reduce((acc, card) => acc + card.rating, 0) /
		deck.cards.length
	return (
		<motion.div
			initial={{
				backgroundColor: 'rgb(248, 230, 205)',
			}}
			whileHover={{
				backgroundColor: 'rgb(236, 218, 194)',
			}}
			whileTap={{
				backgroundColor: 'rgb(236, 218, 194)',
				transition: {
					duration: 0,
				},
			}}
			onClick={handlePick}
			className='cursor-pointer group mb-2 rounded-md text-sm transition-all px-3 py-4 flex justify-between items-center gap-x-8 w-full'>
			<div className='flex flex-col min-w-0'>
				{deck.tag && <Tag className='text-[10px]' tag={deck.tag} />}
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
					setContextMenuOpen={setContextMenuOpen}
					handleEdit={handleEdit}
					handleDelete={handleDelete}
					setDeleting={setDeleting}
					handleProps={props.handleProps}
				/>
			</div>
		</motion.div>
	)
}

export default DeckPreview

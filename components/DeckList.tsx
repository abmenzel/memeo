import clsx from 'clsx'
import { PlusCircle } from 'lucide-react'
import { useContext, useEffect, useMemo, useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { AppContext } from '../context/app'
import { template } from '../lib/utils'
import Deck from '../models/Deck'
import DeckPreview from './DeckPreview'

type Props = React.HTMLAttributes<HTMLDivElement>

const DeckList: React.FC<Props> = (props) => {
	const { className } = props
	const [editing, setEditing] = useState<Deck | null>(null)
	const { state, actions } = useContext(AppContext)
	const defaultDecksSort = useMemo(() => {
		return state.decks.sort((deckA, deckB) => deckA.order - deckB.order)
	}, [state.decks])
	const [filteredDecks, setFilteredDecks] = useState<Deck[]>(defaultDecksSort)
	const handleNewDeck = async () => {
		if (!state.user) return

		const newDeck = await actions.addDeck(
			template.newDeck(
				state.decks.length,
				state.user.id,
				state.activeTag ? state.activeTag : undefined
			)
		)

		setEditing(newDeck)
	}

	useEffect(() => {
		if (state.activeTag === null) {
			setFilteredDecks(defaultDecksSort)
		} else {
			setFilteredDecks(
				state.decks
					.filter((deck) => deck.tag_id === state.activeTag?.id)
					.sort((deckA, deckB) => deckA.order - deckB.order)
			)
		}
	}, [state.decks, state.activeTag])

	return (
		<div
			className={clsx(
				'overflow-y-auto hide-scrollbar flex-grow flex relative flex-col items-center gap-y-2 w-full',
				className
			)}>
			{filteredDecks.length > 0 ? (
				<Droppable droppableId='droppable-1' type='PERSON'>
					{(provided) => (
						<div
							className='w-full flex flex-col'
							ref={provided.innerRef}
							{...provided.droppableProps}>
							{filteredDecks.map((deck, idx) => (
								<Draggable
									draggableId={`draggable-${idx}`}
									key={idx}
									index={idx}>
									{(pr) => (
										<div
											ref={pr.innerRef}
											{...pr.draggableProps}>
											<DeckPreview
												key={idx}
												deck={deck}
												editing={editing}
												setEditing={setEditing}
												handleProps={pr.dragHandleProps}
											/>
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			) : (
				<p className='max-w-sm text-center'>
					A card deck is a collection of cards used to practice a
					certain topic.
				</p>
			)}
			<div className='mt-4 pb-4'>
				<button onClick={handleNewDeck} className='btn-primary'>
					<PlusCircle /> Add deck
				</button>
			</div>
		</div>
	)
}

export default DeckList

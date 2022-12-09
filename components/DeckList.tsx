import { PlusCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/app'
import { storeDeck } from '../lib/api'
import { createNewCard } from '../lib/api.utils'
import Card from '../models/Card'
import Deck from '../models/Deck'
import { Types } from '../context/reducers'
import DeckPreview from './DeckPreview'
import { Draggable, Droppable } from 'react-beautiful-dnd'

const DeckList = () => {
	const [editing, setEditing] = useState<Deck | null>(null)
	const { dispatch, state } = useContext(AppContext)
	const handleNewDeck = async () => {
		if (!state.user) return

		const createdDeck: Deck = {
			id: null,
			title: '',
			cards: [],
			order: state.decks.length,
			created_by: state.user.id,
			tag_id: null,
		}

		dispatch({
			type: Types.AddDeck,
			payload: createdDeck,
		})

		const newDeckId = await storeDeck(createdDeck)
		if (!newDeckId) return

		const newDeck = { ...createdDeck, id: newDeckId }
		dispatch({
			type: Types.UpdateDeck,
			payload: {
				oldDeck: createdDeck,
				newDeck: newDeck,
			},
		})

		const newCard: Card = {
			deck_id: newDeck.id,
			front: '',
			back: '',
			rating: 0,
			id: null,
		}

		createNewCard(dispatch, newCard)

		setEditing(newDeck)
	}

	return (
		<div className='flex flex-col items-center gap-y-2 my-4 mb-16 w-full'>
			{state.decks.length > 0 ? (
				<Droppable droppableId='droppable-1' type='PERSON'>
					{(provided) => (
						<div
							className='w-full flex flex-col'
							ref={provided.innerRef}
							{...provided.droppableProps}>
							{state.decks.map((deck, idx) => (
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
			<div className='mt-4'>
				<button onClick={handleNewDeck} className='btn-primary'>
					<PlusCircle /> Add deck
				</button>
			</div>
		</div>
	)
}

export default DeckList

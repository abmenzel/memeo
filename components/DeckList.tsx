import { Plus, PlusCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/app'
import { storeCard, storeDeck, supabase } from '../lib/api'
import { createNewCard } from '../lib/api.utils'
import Card from '../models/Card'
import Deck from '../models/Deck'
import DeckType from '../models/Deck'
import { Types } from '../reducers/reducers'
import { testCards1 } from '../test/data/testCards'
import DeckPreview from './DeckPreview'

const DeckList = () => {
	const [editing, setEditing] = useState<Deck | null>(null)
	const { dispatch, state } = useContext(AppContext)

	const handleNewDeck = async () => {
		if (!state.user) return

		const createdDeck: Deck = {
			id: null,
			title: '',
			cards: [],
			created_by: state.user.id,
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
		<div className='flex flex-col gap-y-2 my-4 mb-16 w-full'>
			{state.decks.map((deck, idx) => (
				<DeckPreview
					key={idx}
					deck={deck}
					editing={editing}
					setEditing={setEditing}
				/>
			))}
			<div>
				<button
					onClick={handleNewDeck}
					className='btn-primary inline-flex gap-x-2 items-center'>
					<Plus /> Add deck
				</button>
			</div>
		</div>
	)
}

export default DeckList

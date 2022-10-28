import { Plus, PlusCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/app'
import { supabase } from '../lib/api'
import Deck from '../models/Deck'
import DeckType from '../models/Deck'
import { Types } from '../reducers/reducers'
import DeckPreview from './DeckPreview'

const DeckList = () => {
	const { dispatch, state } = useContext(AppContext)
	const [newDeck, setNewDeck] = useState<null | Deck>(null)

	useEffect(() => {
		if (newDeck && state.user) {
			dispatch({
				type: Types.AddDeck,
				payload: { title: 'New deck', cards: [] },
			})
			supabase
				.from('decks')
				.insert({
					created_by: state.user.id,
					title: '',
				})
				.then((res) => {
					console.log(res)
				})
		}
	}, [newDeck])

	return (
		<div className='flex flex-col gap-y-2 my-4 mb-16 w-full'>
			{state.decks.map((deck, idx) => (
				<DeckPreview key={idx} deck={deck} />
			))}
			<button
				onClick={() => {
					console.log('click')
					setNewDeck({
						title: '',
						cards: [],
					})
				}}
				className='flex gap-x-2 items-center'>
				<Plus /> Add deck
			</button>
		</div>
	)
}

export default DeckList

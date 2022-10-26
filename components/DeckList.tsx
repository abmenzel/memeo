import React from 'react'
import DeckType from '../models/Deck'
import DeckPreview from './DeckPreview'

type DeckListProps = {
	decks: DeckType[]
}

const DeckList = ({ decks }: DeckListProps) => {
	return (
		<div className='flex flex-col gap-y-2 my-4 mb-16 w-full'>
			{decks.map((deck) => (
				<DeckPreview deck={deck} />
			))}
		</div>
	)
}

export default DeckList

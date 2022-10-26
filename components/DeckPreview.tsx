import React from 'react'
import Deck from '../models/Deck'

type DeckPreviewProps = {
	deck: Deck
}

const DeckPreview = ({ deck }: DeckPreviewProps) => {
	return (
		<div className='flex space-between btn-primary'>
			<h3 className='font-bold text-lg flex items-center gap-x-2'>
				{deck.title}
			</h3>
		</div>
	)
}

export default DeckPreview

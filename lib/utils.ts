import Card from '../models/Card'
import Deck from '../models/Deck'
import Tag from '../models/Tag'

export const cardIsEmpty = (card: Card) => {
	return card.back === '' && card.front === ''
}

export const template = {
	newDeck: (order: number, created_by: string, tag?: Tag): Deck => ({
		id: -1,
		title: 'Untitled Deck',
		cards: [],
		order: order,
		created_by: created_by,
		tag_id: tag ? tag.id : null,
		tag: tag ? tag : undefined,
	}),
	newCard: (deck_id: number): Card => ({
		id: -1,
		deck_id: deck_id,
		front: '',
		back: '',
		rating: 0,
	}),
}

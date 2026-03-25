import Card from '../models/Card'
import Deck from '../models/Deck'
import Tag from '../models/Tag'

export const cardIsEmpty = (card: Card) => {
	return card.back === '' && card.front === ''
}

export const template = {
	newDeck: (order: number, tag?: Tag): Deck => ({
		id: -1,
		name: 'Untitled Deck',
		cards: [],
		order: order,
		tags: tag ? [tag] : []
	}),
	newCard: (deck_id: number): Card => ({
		id: -1,
		deck_id: deck_id,
		front: '',
		back: '',
		rating: 0,
	}),
}

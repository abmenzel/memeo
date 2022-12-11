import Card from '../models/Card'
import Deck from '../models/Deck'

export const cardIsEmpty = (card: Card) => {
	return card.back === '' && card.front === ''
}

export const template = {
	newDeck: (order: number, created_by: string): Deck => ({
		id: null,
		title: '',
		cards: [],
		order: order,
		created_by: created_by,
		tag_id: null,
	}),
	newCard: (deck_id: string): Card => ({
		id: null,
		deck_id: deck_id,
		front: '',
		back: '',
		rating: 0,
	}),
}

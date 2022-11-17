import Card from '../models/Card'

export const cardIsEmpty = (card: Card) => {
	return card.back === '' && card.front === ''
}

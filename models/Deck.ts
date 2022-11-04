import Card from './Card'

interface Deck {
	id: string | null
	title: string
	cards: Card[]
	created_by: string
}

export default Deck

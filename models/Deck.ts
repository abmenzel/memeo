import Card from './Card'
import Tag from './Tag'

interface Deck {
	id: string | null
	title: string
	cards: Card[]
	created_by: string
	order: number
	tag?: Tag
}

export default Deck

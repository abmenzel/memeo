import Card from './Card'
import Tag from './Tag'

interface Deck {
	id: number
	title: string
	cards: Card[]
	created_by: string
	order: number
	tag_id: number | null
	tag?: Tag
}

export type CreateDeckProps = {
	title: string
}

export type UpdateDeckProps = {
	id: number
	title?: string
}

export type DeleteDeckProps = {
	id: number
}

export default Deck

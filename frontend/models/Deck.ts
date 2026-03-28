import Card from './Card'
import Tag from './Tag'

interface Deck {
	id: number
	name: string
	cards: Card[]
	order: number
	tags: Tag[]
}

export type CreateDeckProps = {
	name: string
}

export type UpdateDeckProps = {
	id: number
	name?: string
	tag_ids?: number[]
	tags?: Tag[]
	order?: number
}

export type DeleteDeckProps = {
	id: number
}

export default Deck

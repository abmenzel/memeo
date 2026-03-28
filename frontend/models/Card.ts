interface Card {
	deck_id: number
	back: string
	front: string
	rating: number
	id: number
}

export type CreateCardProps = {
	deck_id: number
	back?: string
	front?: string
	rating?: number
}

export type UpdateCardProps = {
	id: number
	deck_id: number
	back?: string
	front?: string
	rating?: number
}

export type DeleteCardProps = {
	id: number
	deck_id: number
}

export default Card

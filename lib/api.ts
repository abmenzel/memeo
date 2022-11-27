import { createClient } from '@supabase/supabase-js'
import Card from '../models/Card'
import { Database } from '../models/Database'
import Deck from '../models/Deck'
import User from '../models/User'

const config = {
	supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL || 'test',
	supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY || 'key',
}

export const supabase = createClient<Database>(
	config.supabaseUrl,
	config.supabaseKey
)

export const getDecksByUser = async (user: User): Promise<Deck[]> => {
	try {
		console.log('finding decks for user', user.id)
		const { data: decksData } = await supabase
			.from('decks')
			.select()
			.eq('created_by', user.id)

		if (!decksData) return []

		const decks = await Promise.all(
			decksData.map(async (deck) => {
				try {
					const { data: cardsData } = await supabase
						.from('cards')
						.select()
						.eq('deck_id', deck.id)

					const deckWithCards: Deck = {
						...deck,
						cards: cardsData
							? cardsData.map((card) => {
									return { ...card }
							  })
							: [],
					}
					return deckWithCards
				} catch (error) {
					console.error()
				}
				return {
					...deck,
					cards: [],
				}
			})
		)
		return decks
	} catch (error) {
		console.error(error)
	}
	return []
}

export const storeDeck = async (deck: Deck) => {
	try {
		const { data: decksAdded } = await supabase
			.from('decks')
			.insert({
				title: deck.title,
				created_by: deck.created_by,
				order: deck.order,
			})
			.select()
		if (decksAdded) {
			return decksAdded[0].id
		}
	} catch (error) {
		console.error(error)
	}
	return null
}

export const deleteDeck = async (deck: Deck) => {
	try {
		await supabase.from('cards').delete().eq('deck_id', deck.id)
		await supabase.from('decks').delete().eq('id', deck.id)
	} catch (error) {
		console.error(error)
	}
}

export const updateDeck = async (deck: Deck) => {
	try {
		await supabase
			.from('decks')
			.update({
				title: deck.title,
				updated_at: new Date().toUTCString(),
				order: deck.order,
			})
			.eq('id', deck.id)
	} catch (error) {
		console.error(error)
	}
}

export const storeCard = async (card: Card) => {
	try {
		const { data: cardsAdded } = await supabase
			.from('cards')
			.insert({
				front: card.front,
				back: card.back,
				deck_id: card.deck_id,
				rating: card.rating,
			})
			.select()
		if (cardsAdded) {
			return cardsAdded[0].id
		}
	} catch (error) {
		console.error(error)
	}
	return null
}

export const updateCard = async (card: Card) => {
	try {
		await supabase
			.from('cards')
			.update({
				front: card.front,
				back: card.back,
				rating: card.rating,
				updated_at: new Date().toUTCString(),
			})
			.eq('id', card.id)
	} catch (error) {
		console.error(error)
	}
}

export const deleteCard = async (card: Card) => {
	try {
		await supabase.from('cards').delete().eq('id', card.id)
	} catch (error) {
		console.error(error)
	}
}

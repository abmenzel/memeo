import { createClient } from '@supabase/supabase-js'
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
		const { data } = await supabase
			.from('decks')
			.select()
			.eq('created_by', user.id)

		if (!data) return []

		const decks = data.reduce((acc: Deck[], deck) => {
			const deckWithCards = {
				...deck,
				cards: [],
			}
			acc.push(deckWithCards)
			return acc
		}, [])
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
			})
			.eq('id', deck.id)
	} catch (error) {
		console.error(error)
	}
}

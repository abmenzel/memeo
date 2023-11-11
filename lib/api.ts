import { createClient } from '@supabase/supabase-js'
import Card from '../models/Card'
import { Database } from '../models/Database'
import Deck from '../models/Deck'
import Tag from '../models/Tag'
import User from '../models/User'

const config = {
	supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL || 'test',
	supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY || 'key',
}

export const supabase = createClient<Database>(
	config.supabaseUrl,
	config.supabaseKey
)

export const database = {
	storeCard: async (card: Card) => {
		console.info('storing card', card)
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
	},
	deleteCard: async (card: Card) => {
		console.info('deleting card', card)
		if (!card.id) throw new Error('Card has no ID')
		try {
			await supabase.from('cards').delete().eq('id', card.id)
		} catch (error) {
			console.error(error)
		}
	},
	updateCard: async (card: Card): Promise<Card> => {
		console.info('updating card', card)
		if (!card.id) throw new Error('Card has no ID')
		try {
			const { data: updatedCard } = await supabase
				.from('cards')
				.update({
					front: card.front,
					back: card.back,
					rating: card.rating,
					updated_at: new Date().toUTCString(),
				})
				.eq('id', card.id)
				.select()
			if (!updatedCard) throw new Error('Card not updated')
			return updatedCard[0]
		} catch (error) {
			console.error(error)
			return card
		}
	},
	storeDeck: async (deck: Deck) => {
		console.info('storing deck', deck)
		try {
			const { data: decksAdded } = await supabase
				.from('decks')
				.insert({
					title: deck.title,
					created_by: deck.created_by,
					tag_id: deck.tag_id,
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
	},
	deleteDeck: async (deck: Deck) => {
		console.info('deleting deck', deck)
		if (!deck.id) throw new Error('Deck has no ID')
		try {
			await supabase.from('cards').delete().eq('deck_id', deck.id)
			await supabase.from('decks').delete().eq('id', deck.id)
		} catch (error) {
			console.error(error)
		}
	},
	getDecksByUser: async (user: User): Promise<Deck[]> => {
		try {
			console.log('finding decks for user', user.id)
			const { data: decksData } = await supabase
				.from('decks')
				.select(
					`
				id,
				title,
				created_by,
				order,
				tag_id,
				tag:tags!tag_id(created_by, id, color, name)
			  `
				)
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
							tag: deck.tag as unknown as Tag | undefined, // Supabase type specifies this as an array, but it is a single tag object
							cards: cardsData
								? cardsData.map((card) => {
										return { ...card }
								  })
								: [],
						}
						return deckWithCards
					} catch (error) {
						console.error(error)
						throw new Error('Error getting cards for deck')
					}
				})
			)
			return decks
		} catch (error) {
			console.error(error)
		}
		return []
	},
	updateDeck: async (deck: Deck) => {
		console.info('updating deck', deck)
		if (!deck.id) throw new Error('Deck has no ID')
		try {
			await supabase
				.from('decks')
				.update({
					title: deck.title,
					updated_at: new Date().toUTCString(),
					order: deck.order,
					tag_id: deck.tag_id,
				})
				.eq('id', deck.id)
		} catch (error) {
			console.error(error)
		}
	},
	updateDecks: async (decks: Deck[]) => {
		console.info('updating decks', decks)
		const decksWithIds = decks.filter((deck) => deck.id)
		const testDeck = decksWithIds[0]
		if (!decks) return
		if (!testDeck) throw new Error('No decks with IDs')
		try {
			if (decksWithIds.length > 1) {
				await supabase.from('decks').upsert(
					decksWithIds.map((deck) => ({
						id: deck.id as string,
						title: deck.title,
						created_by: deck.created_by,
						order: deck.order,
						tag_id: deck.tag_id,
					}))
				)
			} else {
				await database.updateDeck(decksWithIds[0])
			}
		} catch (error) {
			console.error(error)
		}
	},
	storeTag: async (tag: Tag): Promise<string | null> => {
		console.info('storing tag', tag)
		try {
			const { data: tagsAdded } = await supabase
				.from('tags')
				.insert({
					name: tag.name,
					color: tag.color,
					created_by: tag.created_by,
				})
				.select()
			if (tagsAdded) {
				return tagsAdded[0].id
			}
		} catch (error) {
			console.error(error)
		}
		return null
	},
	deleteTag: async (tag: Tag): Promise<void> => {
		console.info('deleting tag', tag)
		if (!tag.id) throw new Error('Tag has no ID')
		try {
			await supabase
				.from('decks')
				.update({ tag_id: null })
				.eq('tag_id', tag.id)
			await supabase.from('tags').delete().eq('id', tag.id)
		} catch (error) {
			console.error(error)
		}
	},
	getTagsByUser: async (user: User): Promise<Tag[]> => {
		console.info('getting tags for user', user)
		try {
			const { data: tagsData } = await supabase
				.from('tags')
				.select()
				.eq('created_by', user.id)
			const tags: Tag[] = tagsData
				? tagsData.map((tag) => {
						return {
							id: tag.id,
							created_by: user.id,
							name: tag.name,
							color: tag.color,
						}
				  })
				: []

			return tags
		} catch (error) {
			console.error(error)
			return []
		}
	},
}

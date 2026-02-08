import Card, { CreateCardProps, DeleteCardProps, UpdateCardProps } from '../models/Card'
import Deck, { CreateDeckProps, DeleteDeckProps, UpdateDeckProps } from '../models/Deck'
import Tag from '../models/Tag'
import { apiFetch } from './api/api-fetch'

export const database = {
	storeCard: async (card: CreateCardProps) => {
		return apiFetch<Card>(`/decks/${card.deck_id}/cards/`, {
			method: 'POST',
			body: JSON.stringify({
				front: card.front,
				back: card.back,
				rating: card.rating,
			}),
		})
	},
	deleteCard: async (card: DeleteCardProps) => {
		return apiFetch(`/decks/${card.deck_id}/cards/${card.id}/`)
	},
	updateCard: async (card: UpdateCardProps) => {
		return apiFetch<Card>(`/decks/${card.deck_id}/cards/${card.id}`, {
			method: 'PUT',
			body: JSON.stringify({
				front: card.front,
				back: card.back,
				rating: card.rating,
			}),
		})
	},
	storeDeck: async (deck: CreateDeckProps) => {
		return apiFetch<Deck>(`/decks/`, {
			method: 'POST',
			body: JSON.stringify({
				name: deck.title
			})
		})
	},
	deleteDeck: async (deck: DeleteDeckProps) => {
		return apiFetch(`/decks/${deck.id}/`, {
			method: 'DELETE',
		})
	},
	updateDeck: async (deck: UpdateDeckProps) => {
		return apiFetch<Deck>(`/decks/${deck.id}/`, {
			method: 'PUT',
			body: JSON.stringify({
				name: deck.title
			})
		})
	},
	updateDecks: async (decks: Deck[]) => {
		return []
	},
	storeTag: async (tag: Tag): Promise<string | null> => {
		return null
	},
	deleteTag: async (tag: Tag): Promise<void> => {
		return
	},
}

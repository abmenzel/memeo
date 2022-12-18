import AppState from '../models/AppState'
import { Actions, types } from './actions'

const reducer = (state: AppState, action: Actions) => {
	switch (action.type) {
		case types.SIGN_IN:
			return {
				...state,
				user: action.payload,
			}
		case types.SIGN_OUT:
			return {
				...state,
				user: action.payload,
			}
		case types.ADD_DECK:
			return {
				...state,
				decks: [...state.decks, action.payload],
			}
		case types.DELETE_DECK:
			return {
				...state,
				decks: [
					...state.decks.filter(
						(deck) => deck.id !== action.payload.id
					),
				],
			}
		case types.UPDATE_DECK:
			return {
				...state,
				decks: [
					...state.decks.filter(
						(deck) => deck.id !== action.payload.id
					),
					action.payload,
				],
			}
		case types.SET_DECKS:
			return {
				...state,
				decks: action.payload,
			}
		case types.PICK_DECK:
			return {
				...state,
				activeDeckId: action.payload,
			}
		case types.ADD_CARD:
			return {
				...state,
				decks: [
					...state.decks.map((deck) =>
						deck.id === action.payload.deck_id
							? {
									...deck,
									cards: [...deck.cards, action.payload],
							  }
							: deck
					),
				],
			}
		case types.DELETE_CARD:
			return {
				...state,
				decks: [
					...state.decks.map((deck) =>
						deck.id === action.payload.deck_id
							? {
									...deck,
									cards: deck.cards.filter(
										(card) => card.id === action.payload.id
									),
							  }
							: deck
					),
				],
			}
		case types.UPDATE_CARD:
			return {
				...state,
				decks: [
					...state.decks.map((deck) =>
						deck.id === action.payload.deck_id
							? {
									...deck,
									cards: deck.cards.map((card) =>
										card.id === action.payload.id
											? action.payload
											: card
									),
							  }
							: deck
					),
				],
			}
		case types.SET_OPTIONS:
			return {
				...state,
				options: action.payload,
			}
		case types.SET_CONSENT:
			return {
				...state,
				consent: action.payload,
			}
		case types.SET_TAGS:
			return {
				...state,
				tags: action.payload,
			}
		case types.ADD_TAG:
			return {
				...state,
				tags: [...state.tags, action.payload],
			}
		case types.DELETE_TAG:
			return {
				...state,
				tags: [
					...state.tags.filter((tag) => tag.id === action.payload.id),
				],
			}
		case types.SET_ACTIVE_TAG:
			return {
				...state,
				activeTag: action.payload,
			}
		default:
			console.error('Error with action', action)
			throw new Error('Error with action')
	}
}

export { reducer }

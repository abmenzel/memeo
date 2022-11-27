import { AppStateType } from '../context/app'
import { supabase } from '../lib/api'
import Card from '../models/Card'
import Deck from '../models/Deck'
import User from '../models/User'

type ActionMap<M extends { [index: string]: any }> = {
	[Key in keyof M]: M[Key] extends undefined
		? {
				type: Key
		  }
		: {
				type: Key
				payload: M[Key]
		  }
}

export enum Types {
	SignIn = 'SIGN_IN',
	SignOut = 'SIGN_OUT',
	AddDeck = 'DECK_ADD',
	DeleteDeck = 'DECK_DELETE',
	UpdateDeck = 'DECK_UPDATE',
	SetDecks = 'DECKS_SET',
	PickDeck = 'DECK_PICK',
	AddCard = 'CARD_ADD',
	DeleteCard = 'CARD_DELETE',
	UpdateCard = 'CARD_UPDATE',
	ConsentLoading = 'CONSENT_LOADING',
	ConsentAwait = 'CONSENT_AWAITING',
	ConsentSome = 'CONSENT_SOME',
	ConsentAll = 'CONSENT_ALL',
	ConsentSet = 'CONSENT_SET',
}

type UserPayload = {
	[Types.SignIn]: {
		id: string
		name: string
	}
	[Types.SignOut]: null
}

type DeckPayload = {
	[Types.AddDeck]: Deck
	[Types.DeleteDeck]: Deck
	[Types.UpdateDeck]: {
		oldDeck: Deck
		newDeck: Deck
	}
	[Types.SetDecks]: Deck[]
}

type ActiveDeckPayload = {
	[Types.PickDeck]: Deck
}

type CardPayload = {
	[Types.AddCard]: Card
	[Types.DeleteCard]: Card
	[Types.UpdateCard]: {
		oldCard: Card
		newCard: Card
	}
}

type ConsentPayload = {
	[Types.ConsentAwait]: Types.ConsentAwait
	[Types.ConsentSome]: Types.ConsentSome
	[Types.ConsentAll]: Types.ConsentAll
	[Types.ConsentLoading]: Types.ConsentLoading
	[Types.ConsentSet]: Types.ConsentSome | Types.ConsentAll
}

export type DeckActions = ActionMap<DeckPayload>[keyof ActionMap<DeckPayload>]
export type ActiveDeckActions =
	ActionMap<ActiveDeckPayload>[keyof ActionMap<ActiveDeckPayload>]
export type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>]
export type CardActions = ActionMap<CardPayload>[keyof ActionMap<CardPayload>]
export type ConsentActions =
	ActionMap<ConsentPayload>[keyof ActionMap<ConsentPayload>]

export type Actions =
	| DeckActions
	| UserActions
	| ActiveDeckActions
	| CardActions
	| ConsentActions

export const userReducer = (
	state: AppStateType,
	action: UserActions
): null | User => {
	switch (action.type) {
		case Types.SignIn:
			return action.payload
		case Types.SignOut:
			return null
		default:
			return state.user
	}
}

export const deckReducer = (
	state: AppStateType,
	action: DeckActions | CardActions
): Deck[] => {
	switch (action.type) {
		case Types.AddDeck: {
			return state.decks
				? [...state.decks, action.payload]
				: [action.payload]
		}
		case Types.DeleteDeck: {
			return state.decks.filter((deck) => deck != action.payload)
		}
		case Types.SetDecks: {
			return action.payload
		}
		case Types.UpdateDeck: {
			const newDecks = state.decks.map((deck) => {
				if (deck.id === action.payload.oldDeck.id) {
					return action.payload.newDeck
				} else {
					return deck
				}
			})
			return newDecks
		}
		case Types.AddCard: {
			const newDecks = state.decks.map((deck) => {
				if (deck.id === action.payload.deck_id) {
					return {
						...deck,
						cards: [...deck.cards, action.payload],
					}
				} else {
					return deck
				}
			})
			return newDecks
		}
		case Types.UpdateCard: {
			const newDecks = state.decks.map((deck) => {
				if (deck.id === action.payload.oldCard.deck_id) {
					return {
						...deck,
						cards: deck.cards.map((card) => {
							if (card.id === action.payload.oldCard.id) {
								return action.payload.newCard
							} else return card
						}),
					}
				} else return deck
			})
			return newDecks
		}
		case Types.DeleteCard: {
			const newDecks = state.decks.map((deck) => {
				if (deck.id === action.payload.deck_id) {
					return {
						...deck,
						cards: deck.cards.filter(
							(card) => card.id !== action.payload.id
						),
					}
				} else return deck
			})
			return newDecks
		}
		default:
			return state.decks
	}
}

export const activeDeckReducer = (
	state: AppStateType,
	action: ActiveDeckActions | CardActions
): null | Deck => {
	switch (action.type) {
		case Types.PickDeck:
			return action.payload
		case Types.AddCard: {
			if (!state.activeDeck) return state.activeDeck
			const newActiveDeck = {
				...state.activeDeck,
				cards: [...state.activeDeck.cards, action.payload],
			}
			return newActiveDeck
		}
		case Types.UpdateCard: {
			if (!state.activeDeck) return state.activeDeck
			const newActiveDeck = {
				...state.activeDeck,
				cards: state.activeDeck.cards.map((card) => {
					if (card.id === action.payload.oldCard.id) {
						return action.payload.newCard
					} else return card
				}),
			}

			return newActiveDeck
		}
		case Types.DeleteCard: {
			if (!state.activeDeck) return state.activeDeck
			const newActiveDeck = {
				...state.activeDeck,
				cards: state.activeDeck.cards.filter(
					(card) => card.id !== action.payload.id
				),
			}
			return newActiveDeck
		}
		default:
			return state.activeDeck
	}
}

export const consentReducer = (state: AppStateType, action: ConsentActions) => {
	switch (action.type) {
		case Types.ConsentAwait:
		case Types.ConsentAll:
		case Types.ConsentLoading:
		case Types.ConsentSet:
		case Types.ConsentSome: {
			return action.payload
		}
		default:
			return Types.ConsentLoading
	}
}

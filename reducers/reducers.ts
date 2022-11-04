import { AppStateType } from '../context/app'
import { supabase } from '../lib/api'
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

export type DeckActions = ActionMap<DeckPayload>[keyof ActionMap<DeckPayload>]
export type ActiveDeckActions =
	ActionMap<ActiveDeckPayload>[keyof ActionMap<ActiveDeckPayload>]
export type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>]

export type Actions = DeckActions | UserActions | ActiveDeckActions

export const userReducer = (
	state: AppStateType,
	action: UserActions
): null | User => {
	switch (action.type) {
		case Types.SignIn:
			return action.payload
		case Types.SignOut:
			localStorage.clear()
			return null
		default:
			return state.user
	}
}

export const deckReducer = (
	state: AppStateType,
	action: DeckActions
): Deck[] => {
	switch (action.type) {
		case Types.AddDeck: {
			return state.decks
				? [...state.decks, action.payload]
				: [action.payload]
		}
		case Types.DeleteDeck: {
			console.log('deleting deck', action.payload)
			console.log(
				'filter',
				state.decks.filter((deck) => deck != action.payload)
			)
			return state.decks.filter((deck) => deck != action.payload)
		}
		case Types.SetDecks: {
			return action.payload
		}
		case Types.UpdateDeck: {
			const newDecks = state.decks.map((deck) => {
				if (deck === action.payload.oldDeck) {
					return action.payload.newDeck
				} else {
					return deck
				}
			})
			return newDecks
		}
		default:
			return state.decks
	}
}

export const activeDeckReducer = (
	state: AppStateType,
	action: ActiveDeckActions
): null | Deck => {
	switch (action.type) {
		case Types.PickDeck:
			return action.payload
		default:
			return state.activeDeck
	}
}

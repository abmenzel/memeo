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
	SetDecks = 'DECKS_SET',
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
	[Types.SetDecks]: Deck[]
}

export type DeckActions = ActionMap<DeckPayload>[keyof ActionMap<DeckPayload>]
export type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>]

export type Actions = DeckActions | UserActions

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
		case Types.SetDecks: {
			return action.payload
		}
		default:
			return state.decks
	}
}

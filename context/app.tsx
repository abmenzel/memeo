import React, {
	createContext,
	Dispatch,
	ReactNode,
	useEffect,
	useReducer,
} from 'react'
import User from '../models/User'
import {
	Actions,
	ActiveDeckActions,
	activeDeckReducer,
	consentReducer,
	DeckActions,
	deckReducer,
	Types,
	UserActions,
	userReducer,
} from '../reducers/reducers'
import { createClient } from '@supabase/supabase-js'
import { getDecksByUser, supabase } from '../lib/api'
import { useRouter } from 'next/router'
import Deck from '../models/Deck'

export type AppStateType = {
	user: null | User
	decks: Deck[]
	activeDeck: null | Deck
	consent:
		| Types.ConsentAll
		| Types.ConsentSome
		| Types.ConsentAwait
		| Types.ConsentLoading
}

const initialAppState: AppStateType = {
	user: null,
	decks: [],
	activeDeck: null,
	consent: Types.ConsentLoading,
}

const AppContext = createContext<{
	state: AppStateType
	dispatch: Dispatch<Actions>
}>({ state: initialAppState, dispatch: (_: any) => {} })

const mainReducer = (state: AppStateType, action: Actions) => {
	switch (action.type) {
		case Types.SignIn:
		case Types.SignOut:
			return {
				...state,
				user: userReducer(state, action),
			}
		case Types.AddDeck:
		case Types.SetDecks:
		case Types.UpdateDeck:
		case Types.DeleteDeck:
			return {
				...state,
				decks: deckReducer(state, action),
			}
		case Types.PickDeck:
			return {
				...state,
				activeDeck: activeDeckReducer(state, action),
			}
		case Types.AddCard:
		case Types.UpdateCard:
		case Types.DeleteCard:
			return {
				...state,
				decks: deckReducer(state, action),
				activeDeck: activeDeckReducer(state, action),
			}
		case Types.ConsentSet:
			return {
				...state,
				consent: consentReducer(state, action),
			}
		default:
			return state
	}
}

type AppProviderProps = {
	children: ReactNode
}

const AppProvider = ({ children }: AppProviderProps) => {
	const [state, dispatch] = useReducer(mainReducer, initialAppState)
	const router = useRouter()

	const tryFindUserFromSession = async () => {
		const { data } = await supabase.auth.getSession()
		if (data?.session?.user) {
			const user = data.session.user
			if (user.identities) {
				const identity = user.identities[0]
				dispatch({
					type: Types.SignIn,
					payload: {
						id: user.id,
						name: identity.identity_data.full_name,
					},
				})
			}
		} else {
			dispatch({
				type: Types.SignOut,
				payload: null,
			})
		}
	}

	const tryFindUserDecks = async (user: User) => {
		const userDecks = await getDecksByUser(user)
		console.log('Found decks', userDecks)
		if (userDecks && userDecks.length > 0) {
			dispatch({
				type: Types.SetDecks,
				payload: userDecks,
			})
		}
	}

	useEffect(() => {
		if (!state.user) {
			tryFindUserFromSession()
		}

		if (state.user) {
			tryFindUserDecks(state.user)
		}
	}, [state.user])

	useEffect(() => {
		if (state.user && router.pathname == '/login') router.push('/dashboard')
		if (!state.user && router.pathname != '/') router.push('/login')
	}, [state.user, router.pathname])

	return (
		<AppContext.Provider value={{ state, dispatch }}>
			{children}
		</AppContext.Provider>
	)
}

export { AppProvider, AppContext }

import React, {
	createContext,
	Dispatch,
	ReactNode,
	useEffect,
	useReducer,
} from 'react'
import User from '../models/User'
import {
	DeckActions,
	deckReducer,
	Types,
	UserActions,
	userReducer,
} from '../reducers/reducers'
import { createClient } from '@supabase/supabase-js'
import { supabase } from '../lib/api'
import { useRouter } from 'next/router'
import Deck from '../models/Deck'

export type AppStateType = {
	user: null | User
	decks: Deck[]
}

const initialAppState: AppStateType = {
	user: null,
	decks: [],
}

const AppContext = createContext<{
	state: AppStateType
	dispatch: Dispatch<UserActions | DeckActions>
}>({ state: initialAppState, dispatch: (_: any) => {} })

const mainReducer = (
	state: AppStateType,
	action: UserActions | DeckActions
) => {
	console.log('main reducer')
	switch (action.type) {
		case Types.SignIn:
		case Types.SignOut:
			return {
				...state,
				user: userReducer(state, action),
			}
		case Types.AddDeck:
			return {
				...state,
				decks: deckReducer(state, action),
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
			console.log('user', user)
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

			const { data: userDecks } = await supabase.from('decks').select()
			console.log('decks', userDecks)
		} else {
			dispatch({
				type: Types.SignOut,
				payload: null,
			})
		}
	}

	useEffect(() => {
		if (!state.user) {
			tryFindUserFromSession()
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

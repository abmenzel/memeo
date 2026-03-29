import { createContext, ReactNode, useEffect, useReducer } from 'react'

import { useRouter } from 'next/router'
import AppState from '../models/AppState'
import { IActions, useActions } from './actions'
import initialAppState from './initialState'
import { reducer } from './reducers'

const AppContext = createContext<{
	state: AppState
	actions: IActions
}>({ state: initialAppState, actions: {} as IActions })

type AppProviderProps = {
	children: ReactNode
}

const AppProvider = ({ children }: AppProviderProps) => {
	const [state, dispatch] = useReducer(reducer, initialAppState)
	const actions = useActions(state, dispatch)
	const router = useRouter()

	useEffect(() => {
		if (!state.user) {
			actions.syncUserFromSession()
		}

		if (state.user) {
			actions.syncUserDecks(state.user)
		}

		if (state.user) {
			actions.syncUserTags(state.user)
		}
	}, [state.user])

	useEffect(() => {
				const publicPages = ['/', '/login', '/signup']

		if (state.user && publicPages.includes(router.pathname)) {
			router.push('/dashboard')
		}
		if (!state.user && !publicPages.includes(router.pathname)) {
			router.push('/login')
		}
	}, [state.user, router.pathname])

	return (
		<AppContext.Provider value={{ state, actions }}>
			{children}
		</AppContext.Provider>
	)
}

export { AppContext, AppProvider }

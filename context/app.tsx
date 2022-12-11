import React, { createContext, ReactNode, useEffect, useReducer } from 'react'

import { useRouter } from 'next/router'
import initialAppState from './initialState'
import AppState from '../models/AppState'
import { reducer } from './reducers'
import { IActions, useActions } from './actions'

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
		if (state.user && router.pathname == '/login') router.push('/dashboard')
		if (!state.user && router.pathname != '/') router.push('/login')
	}, [state.user, router.pathname])

	return (
		<AppContext.Provider value={{ state, actions }}>
			{children}
		</AppContext.Provider>
	)
}

export { AppProvider, AppContext }

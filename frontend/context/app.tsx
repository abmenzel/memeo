import { createContext, ReactNode, useEffect, useReducer, useRef } from 'react'

import { useRouter } from 'next/router'
import AppState from '../models/AppState'
import { IActions, types, useActions } from './actions'
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
	const modalStackLenRef = useRef(state.modalStack.length)

	useEffect(() => {
		modalStackLenRef.current = state.modalStack.length
	}, [state.modalStack])

	useEffect(() => {
		const onPopState = () => {
			if (modalStackLenRef.current > 0) {
				dispatch({ type: types.HIDE_MODAL, payload: null })
			}
		}
		window.addEventListener("popstate", onPopState)
		return () => window.removeEventListener("popstate", onPopState)
	}, [])

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
		if (state.userLoading) return

		const publicPages = ['/', '/login', '/signup']

		if (state.user && publicPages.includes(router.pathname)) {
			router.push('/dashboard')
		}
		if (!state.user && !publicPages.includes(router.pathname)) {
			router.push('/login')
		}
	}, [state.user, state.userLoading, router.pathname])

	return (
		<AppContext.Provider value={{ state, actions }}>
			{children}
		</AppContext.Provider>
	)
}

export { AppContext, AppProvider }

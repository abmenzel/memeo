import React, {
	createContext,
	Dispatch,
	ReactNode,
	useEffect,
	useReducer,
} from 'react'
import User from '../models/User'
import { Types, UserActions, userReducer } from '../reducers/reducers'
import { createClient } from '@supabase/supabase-js'
import { supabase } from '../lib/api'
import { useRouter } from 'next/router'

type initialAppStateType = {
	user: null | User
}

const initialAppState: initialAppStateType = {
	user: null,
}

const AppContext = createContext<{
	state: initialAppStateType
	dispatch: Dispatch<UserActions>
}>({ state: initialAppState, dispatch: (_: any) => {} })

const mainReducer = (state: initialAppStateType, action: UserActions) => ({
	...state,
	user: userReducer(state.user, action),
})

type AppProviderProps = {
	children: ReactNode
}

const AppProvider = ({ children }: AppProviderProps) => {
	const [state, dispatch] = useReducer(mainReducer, initialAppState)
	const router = useRouter()
	const tryFindUserFromSession = async () => {
		console.log(router.pathname)
		const { data } = await supabase.auth.getSession()
		if (data?.session?.user) {
			const user = data.session.user
			if (user.identities) {
				const identity = user.identities[0]
				dispatch({
					type: Types.SignIn,
					payload: {
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

	useEffect(() => {
		if (!state.user) {
			tryFindUserFromSession()
		}
	}, [state.user])

	useEffect(() => {
		console.log(state.user, router.pathname)
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

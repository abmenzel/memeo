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
import Database from '../models/Database'
import { supabase } from '../lib/api'

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

	const tryFindUserFromSession = async () => {
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
		}
	}

	useEffect(() => {
		if (!state.user) {
			tryFindUserFromSession()
		}
	}, [state.user])

	return (
		<AppContext.Provider value={{ state, dispatch }}>
			{children}
		</AppContext.Provider>
	)
}

export { AppProvider, AppContext }

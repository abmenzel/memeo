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
}

type UserPayload = {
	[Types.SignIn]: {
		name: string
	}
	[Types.SignOut]: null
}

export type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>]

export const userReducer = (state: null | User, action: UserActions) => {
	switch (action.type as Types) {
		case Types.SignIn:
			return action.payload
		case Types.SignOut:
			return null
		default:
			return state
	}
}

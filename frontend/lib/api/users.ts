import User from '../../models/User'
import { apiFetch } from './api-fetch'

export type Session = {
	id: number
	token: string
	user: User
}

export const createUser = (body: { email_address: string; password: string }) =>
	apiFetch<Session>('/users', {
		method: 'POST',
		body: JSON.stringify({ user: body }),
	})

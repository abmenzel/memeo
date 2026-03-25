import User from '../../models/User'
import { apiFetch } from './api-fetch'

export type Session = {
	id: number
	token: string
	user: User
}

export const createSession = (body: { email_address: string; password: string }) =>
	apiFetch<Session>(`/session/`, {
		method: 'POST',
		body: JSON.stringify(body),
	})

export const getSession = () => apiFetch<{user: User}>('/session/', {
		method: 'GET',
	})

import { apiFetch } from './api-fetch'

export type Session = {
	id: number
	token: string
}

export const createSession = (body: { email_address: string; password: string }) =>
	apiFetch<Session>(`/session/`, {
		method: 'POST',
		body: JSON.stringify(body),
	})

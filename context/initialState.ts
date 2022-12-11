import AppState from '../models/AppState'

const initialAppState: AppState = {
	user: null,
	decks: [],
	tags: [],
	activeTag: null,
	activeDeck: null,
	consent: 'LOADING',
	options: {
		initialFlipState: false,
	},
}

export default initialAppState

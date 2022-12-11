import AppState from '../models/AppState'

const initialAppState: AppState = {
	user: null,
	decks: [],
	tags: [],
	activeDeck: null,
	consent: 'LOADING',
	options: {
		initialFlipState: false,
	},
}

export default initialAppState

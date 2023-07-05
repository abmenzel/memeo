import AppState from '../models/AppState'

const initialAppState: AppState = {
	user: null,
	userLoading: true,
	decks: [],
	decksLoading: true,
	tags: [],
	activeTag: null,
	activeDeckId: null,
	consent: 'LOADING',
	options: {
		initialFlipState: false,
	},
}

export default initialAppState

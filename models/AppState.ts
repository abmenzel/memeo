import User from '../models/User'
import Consent from './Consent'
import Deck from './Deck'
import Options from './Options'
import Tag from './Tag'

export default interface AppState {
	user: null | User
	decks: Deck[]
	tags: Tag[]
	activeTag: Tag | null
	activeDeckId: null | string
	consent: Consent
	options: Options
}

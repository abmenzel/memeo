import User from '../models/User'
import Deck from './Deck'
import { ShowModalConfig } from './ModalState'
import Options from './Options'
import Tag from './Tag'

export default interface AppState {
	user: null | User
	userLoading: boolean
	decks: Deck[]
	decksLoading: boolean
	tags: Tag[]
	activeTag: Tag | null
	activeDeckId: null | number
	options: Options
	modalStack: ShowModalConfig[]
}

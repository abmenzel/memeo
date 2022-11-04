import Deck from '../../models/Deck'
import { testCards1 } from './testCards'

export const testDeck1: Deck = {
	id: null,
	created_by: 'alex',
	title: 'This is a test deck',
	cards: testCards1,
}

export const testDeck2: Deck = {
	id: null,
	created_by: 'alex',
	title: 'Just another deck',
	cards: testCards1,
}

export const testDecks = [testDeck1, testDeck2]

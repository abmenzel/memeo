import Deck from '../../models/Deck'
import { testCards1, testCards2 } from './testCards'

export const testDeck1: Deck = {
	id: 'testDeck1',
	created_by: 'alex',
	title: 'This is a test deck',
	cards: testCards1,
	order: 0,
}

export const testDeck2: Deck = {
	id: 'testDeck2',
	created_by: 'alex',
	title: 'Just another deck',
	cards: testCards2,
	order: 1,
}

export const testDecks = [testDeck1, testDeck2]

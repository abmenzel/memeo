import Deck from '../../models/Deck'

export const testDeck1: Deck = {
	title: 'This is a test deck',
	cards: [
		{
			front: 'Test front',
			back: 'Test back',
			rating: 1,
		},
		{
			front: 'Test front 2',
			back: 'Test back 2',
			rating: 3,
		},
	],
}

export const testDeck2: Deck = {
	title: 'Just another deck',
	cards: [
		{
			front: 'Test front',
			back: 'Test back',
			rating: 1,
		},
		{
			front: 'Test front 2',
			back: 'Test back 2',
			rating: 3,
		},
	],
}

export const testDecks = [testDeck1, testDeck2]

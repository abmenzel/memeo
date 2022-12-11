import { Dispatch } from 'react'
import AppState from '../models/AppState'
import Card from '../models/Card'
import Deck from '../models/Deck'
import Options from '../models/Options'
import User from '../models/User'
import Consent from '../models/Consent'
import { database, supabase } from '../lib/api'
import { useRouter } from 'next/router'
import { template } from '../lib/utils'
import Tag from '../models/Tag'

enum types {
	SIGN_IN = 'SIGN_IN',
	SIGN_OUT = 'SIGN_OUT',

	ADD_DECK = 'ADD_DECK',
	DELETE_DECK = 'DELETE_DECK',
	UPDATE_DECK = 'UPDATE_DECK',
	SET_DECKS = 'SET_DECKS',
	PICK_DECK = 'PICK_DECK',

	ADD_CARD = 'ADD_CARD',
	DELETE_CARD = 'DELETE_CARD',
	UPDATE_CARD = 'UPDATE_CARD',

	SET_CONSENT = 'SET_CONSENT',

	SET_OPTIONS = 'SET_OPTIONS',

	SET_TAGS = 'SET_TAGS',
	ADD_TAG = 'ADD_TAG',
	DELETE_TAG = 'DELETE_TAG',
}

type ActionMap<M extends { [index: string]: any }> = {
	[Key in keyof M]: M[Key] extends undefined
		? {
				type: Key
		  }
		: {
				type: Key
				payload: M[Key]
		  }
}

type Payloads = {
	[types.SIGN_IN]: User
	[types.SIGN_OUT]: null

	[types.ADD_DECK]: Deck
	[types.DELETE_DECK]: Deck
	[types.SET_DECKS]: Deck[]
	[types.UPDATE_DECK]: Deck
	[types.PICK_DECK]: Deck

	[types.ADD_CARD]: Card
	[types.DELETE_CARD]: Card
	[types.UPDATE_CARD]: Card

	[types.SET_CONSENT]: Consent

	[types.SET_OPTIONS]: Options

	[types.SET_TAGS]: Tag[]
	[types.ADD_TAG]: Tag
	[types.DELETE_TAG]: Tag
}

export type Actions = ActionMap<Payloads>[keyof ActionMap<Payloads>]

export type IActions = {
	signIn: (user: User) => void
	signOut: () => void
	addDeck: (deck: Deck) => Promise<Deck>
	deleteDeck: (deck: Deck) => Promise<void>
	updateDeck: (deck: Deck) => void
	setDecks: (decks: Deck[]) => void
	pickDeck: (deck: Deck) => void
	addCard: (card: Card) => void
	deleteCard: (card: Card) => void
	updateCard: (card: Card) => void
	addTag: (tag: Tag) => Promise<string>
	deleteTag: (tag: Tag) => Promise<void>
	setOptions: (options: Options) => void
	setConsent: (consent: Consent) => void
	syncUserDecks: (user: User) => Promise<void>
	syncUserFromSession: () => Promise<void>
	syncUserTags: (user: User) => Promise<void>
}

const useActions = (state: AppState, dispatch: Dispatch<Actions>): IActions => {
	const router = useRouter()

	const signIn = (user: User) => {
		dispatch({
			type: types.SIGN_IN,
			payload: user,
		})
	}

	const signOut = () => {
		dispatch({
			type: types.SIGN_OUT,
			payload: null,
		})
		router.push('/login')
	}

	const addDeck = async (deck: Deck) => {
		const deckId = await database.storeDeck(deck)
		if (!deckId) throw Error('Error generating deck ID')
		const newDeck = {
			...deck,
			id: deckId,
		}
		dispatch({
			type: types.ADD_DECK,
			payload: newDeck,
		})
		addCard(template.newCard(deckId))
		return newDeck
	}

	const deleteDeck = async (deck: Deck) => {
		dispatch({
			type: types.DELETE_DECK,
			payload: deck,
		})
		await database.deleteDeck(deck)
	}

	const updateDeck = async (deck: Deck) => {
		dispatch({
			type: types.UPDATE_DECK,
			payload: deck,
		})
		await database.updateDeck(deck)
	}

	const setDecks = async (decks: Deck[]) => {
		dispatch({
			type: types.SET_DECKS,
			payload: decks,
		})
	}

	const pickDeck = (deck: Deck) => {
		dispatch({
			type: types.PICK_DECK,
			payload: deck,
		})
		router.push('/dojo')
	}

	const addCard = async (card: Card): Promise<Card> => {
		const cardId = await database.storeCard(card)
		const newCard = { ...card, id: cardId }
		dispatch({
			type: types.ADD_CARD,
			payload: newCard,
		})
		return newCard
	}

	const deleteCard = async (card: Card) => {
		dispatch({
			type: types.DELETE_CARD,
			payload: card,
		})
		await database.deleteCard(card)
	}

	const updateCard = async (card: Card) => {
		dispatch({
			type: types.UPDATE_CARD,
			payload: card,
		})
		await database.updateCard(card)
	}

	const addTag = async (tag: Tag) => {
		const tagId = await database.storeTag(tag)
		if (!tagId) throw new Error('Error generating tag ID')
		const newTag = { ...tag, id: tag }
		dispatch({
			type: types.ADD_TAG,
			payload: newTag,
		})
		return tag
	}

	const deleteTag = async (tag: Tag) => {
		const tagId = await database.deleteTag(tag)
		dispatch({
			type: types.DELETE_TAG,
			payload: tag,
		})
	}

	const setOptions = (options: Options) => {
		dispatch({
			type: types.SET_OPTIONS,
			payload: options,
		})
	}

	const setConsent = (consent: Consent) => {
		dispatch({
			type: types.SET_CONSENT,
			payload: consent,
		})
		window.localStorage.setItem('CONSENT', consent)
	}

	const syncUserDecks = async (user: User) => {
		const userDecks = await database.getDecksByUser(user)
		if (userDecks?.length > 0) {
			const decksSortedByOrder = userDecks.sort(
				(deckA, deckB) => deckA.order - deckB.order
			)
			dispatch({
				type: types.SET_DECKS,
				payload: decksSortedByOrder,
			})
		}
	}

	const syncUserFromSession = async () => {
		const { data } = await supabase.auth.getSession()
		if (data?.session?.user) {
			const user = data.session.user
			if (user.identities) {
				const identity = user.identities[0]
				dispatch({
					type: types.SIGN_IN,
					payload: {
						id: user.id,
						name: identity.identity_data.full_name,
					},
				})
			}
		} else {
			dispatch({
				type: types.SIGN_OUT,
				payload: null,
			})
		}
	}

	const syncUserTags = async (user: User) => {
		const tags = await database.getTagsByUser(user)
		dispatch({
			type: types.SET_TAGS,
			payload: tags,
		})
	}

	return {
		signIn,
		signOut,
		addDeck,
		deleteDeck,
		setDecks,
		updateDeck,
		pickDeck,
		addCard,
		deleteCard,
		updateCard,
		addTag,
		deleteTag,
		setOptions,
		setConsent,
		syncUserDecks,
		syncUserFromSession,
		syncUserTags,
	}
}

export { types, useActions }

import { useRouter } from 'next/router'
import { Dispatch } from 'react'
import { template } from '../lib/utils'
import AppState from '../models/AppState'
import Card from '../models/Card'
import Deck, { UpdateDeckProps } from '../models/Deck'
import { ShowModalConfig } from '../models/ModalState'
import Options from '../models/Options'
import Tag from '../models/Tag'
import User from '../models/User'
import { database } from '../lib/api'
import { listDecks } from '../lib/api/decks'
import { listTags } from '../lib/api/tags'
import { getSession } from '../lib/api/sessions'

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

	SET_OPTIONS = 'SET_OPTIONS',

	SET_TAGS = 'SET_TAGS',
	ADD_TAG = 'ADD_TAG',
	DELETE_TAG = 'DELETE_TAG',
	SET_ACTIVE_TAG = 'SET_ACTIVE_TAG',

	SHOW_MODAL = 'SHOW_MODAL',
	HIDE_MODAL = 'HIDE_MODAL',
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
	[types.UPDATE_DECK]: UpdateDeckProps
	[types.PICK_DECK]: number

	[types.ADD_CARD]: Card
	[types.DELETE_CARD]: Card
	[types.UPDATE_CARD]: Card

	[types.SET_OPTIONS]: Options

	[types.SET_TAGS]: Tag[]
	[types.ADD_TAG]: Tag
	[types.DELETE_TAG]: Tag
	[types.SET_ACTIVE_TAG]: Tag | null

	[types.SHOW_MODAL]: ShowModalConfig
	[types.HIDE_MODAL]: null
}

export type Actions = ActionMap<Payloads>[keyof ActionMap<Payloads>]

export type IActions = {
	signIn: (user: User) => void
	signOut: () => void
	addDeck: (deck: Deck) => Promise<Deck>
	deleteDeck: (deck: Deck) => Promise<void>
	updateDeck: (deck: UpdateDeckProps) => void
	setDecks: (decks: Deck[]) => void
	pickDeck: (deck: Deck) => void
	addCard: (card: Card) => void
	duplicateDeck: (deck: Deck) => Promise<Deck>
	deleteCard: (card: Card) => void
	updateCard: (card: Card) => Promise<Card>
	addTag: (tag: Tag) => Promise<Tag>
	deleteTag: (tag: Tag) => Promise<void>
	setActiveTag: (tag: Tag | null) => Promise<void>
	setOptions: (options: Options) => void
	syncUserDecks: (user: User) => Promise<void>
	syncUserFromSession: () => Promise<void>
	syncUserTags: (user: User) => Promise<void>
	showModal: (modal: ShowModalConfig) => void
	hideModal: () => void
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
		localStorage.removeItem('token')
		dispatch({
			type: types.SIGN_OUT,
			payload: null,
		})
		router.push('/login')
	}

	const addDeck = async (
		deck: Deck,
		options?: {
			addDefault?: boolean
		},
	) => {
		const res = await database.storeDeck(deck)
		if (!res.ok) {
			throw Error(res.error.message)
		}
		const newDeck = {
			...deck,
			id: res.data.id,
		}
		dispatch({
			type: types.ADD_DECK,
			payload: newDeck,
		})
		if (options && options.addDefault === false) return newDeck
		await addCard(template.newCard(res.data.id))
		return newDeck
	}

	const deleteDeck = async (deck: Deck) => {
		dispatch({
			type: types.DELETE_DECK,
			payload: deck,
		})
		await database.deleteDeck(deck)
	}

	const updateDeck = async (deck: UpdateDeckProps) => {
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
		if (!deck.id) return
		dispatch({
			type: types.PICK_DECK,
			payload: deck.id,
		})
		router.push('/dojo')
	}

	const duplicateDeck = async (deck: Deck) => {
		const newDeck = await addDeck(
			{
				...deck,
				cards: [],
				name: `${deck.name} (copy)`,
			},
			{
				addDefault: false,
			},
		)
		await Promise.all(
			deck.cards.map(async (card) => {
				await addCard({
					...card,
					deck_id: newDeck.id,
				})
			}),
		)
		return newDeck
	}

	const addCard = async (card: Card): Promise<Card> => {
		const res = await database.storeCard(card)
		if (!res.ok) {
			throw new Error(res.error.message)
		}
		const newCard = { ...card, id: res.data.id }
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

	const updateCard = async (card: Card): Promise<Card> => {
		dispatch({
			type: types.UPDATE_CARD,
			payload: card,
		})
		const res = await database.updateCard(card)
		if (!res.ok) {
			throw new Error(res.error.message)
		}
		return res.data
	}

	const addTag = async (tag: Tag) => {
		const res = await database.storeTag(tag)
		if (!res.ok) {
			throw new Error(res.error.message)
		}
		const newTag = res.data
		dispatch({
			type: types.ADD_TAG,
			payload: newTag,
		})
		return newTag
	}

	const deleteTag = async (tag: Tag) => {
		const res = await database.deleteTag(tag)
		if (!res.ok) {
			throw new Error(res.error.message)
		}
		dispatch({
			type: types.DELETE_TAG,
			payload: tag,
		})
	}

	const setActiveTag = async (tag: Tag | null) => {
		dispatch({
			type: types.SET_ACTIVE_TAG,
			payload: tag,
		})
	}

	const setOptions = (options: Options) => {
		dispatch({
			type: types.SET_OPTIONS,
			payload: options,
		})
	}

	const syncUserDecks = async () => {
		const res = await listDecks()
		if (!res.ok) {
			console.error(res.error)
			return
		}
		const sortedDecks: Deck[] = res.data ?? []
		dispatch({
			type: types.SET_DECKS,
			payload: sortedDecks,
		})
	}

	const syncUserFromSession = async () => {
		const storedToken = localStorage.getItem('token')

		if (storedToken) {
			const res = await getSession()
			if(res.ok){
				dispatch({
					type: types.SIGN_IN,
					payload: {
						id: res.data.user.id, // TODO: remove
						email_address: res.data.user.email_address,
					},
				})
			}
			
			return
		}
		dispatch({
			type: types.SIGN_OUT,
			payload: null,
		})
	}

	const syncUserTags = async () => {
		const res = await listTags()
		if (!res.ok) {
			console.error(res.error)
			return
		}
		const tags: Tag[] = res.data ?? []
		dispatch({
			type: types.SET_TAGS,
			payload: tags,
		})
	}

	const showModal = (modal: ShowModalConfig) => {
		dispatch({
			type: types.SHOW_MODAL,
			payload: modal,
		})
	}

	const hideModal = () => {
		dispatch({
			type: types.HIDE_MODAL,
			payload: null,
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
		setActiveTag,
		setOptions,
		syncUserDecks,
		syncUserFromSession,
		syncUserTags,
		showModal,
		hideModal,
		duplicateDeck,
	}
}

export { types, useActions }

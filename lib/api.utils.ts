import { Dispatch } from 'react'
import Card from '../models/Card'
import { Actions, Types } from '../context/reducers'
import { storeCard } from './api'

export const createNewCard = async (
	dispatch: Dispatch<Actions>,
	card: Card
) => {
	const createdCard = card

	dispatch({
		type: Types.AddCard,
		payload: card,
	})

	const newCardId = await storeCard(createdCard)
	const newCard = { ...createdCard, id: newCardId }

	dispatch({
		type: Types.UpdateCard,
		payload: {
			oldCard: createdCard,
			newCard: newCard,
		},
	})
}

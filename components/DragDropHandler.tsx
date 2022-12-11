import React, { ReactNode, useContext } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { AppContext } from '../context/app'

type DragDropHandlerProps = {
	children: ReactNode
}

const DragDropHandler = ({ children }: DragDropHandlerProps) => {
	const { state, actions } = useContext(AppContext)

	const handleDragEnd = (result: any) => {
		if (!result.destination) return
		const { source, destination } = result
		if (source.index === destination.index) return
		const newDeckOrder = [...state.decks]
		const element = newDeckOrder.splice(source.index, 1)[0]
		newDeckOrder.splice(destination.index, 0, element)

		const decksWithUpdatedOrder = newDeckOrder.map((deck, idx) => {
			return {
				...deck,
				order: idx,
			}
		})
		actions.setDecks(decksWithUpdatedOrder)
	}

	return (
		<DragDropContext onDragEnd={handleDragEnd}>{children}</DragDropContext>
	)
}

export default DragDropHandler

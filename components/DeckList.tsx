import classNames from 'classnames'
import clsx from 'clsx'
import { PlusCircle } from 'lucide-react'
import { useCallback, useContext } from 'react'
import {
	DragDropContext,
	Draggable,
	DropResult,
	Droppable,
} from 'react-beautiful-dnd'
import { AppContext } from '../context/app'
import { database } from '../lib/api'
import { template } from '../lib/utils'
import Deck from '../models/Deck'
import DeckPreview from './DeckPreview'

type Props = React.HTMLAttributes<HTMLDivElement>

const reorder = (decks: Deck[], startIndex: number, endIndex: number) => {
	const result = Array.from(decks)
	const [removed] = result.splice(startIndex, 1)
	result.splice(endIndex, 0, removed)

	return result.map((deck, idx) => ({ ...deck, order: idx }))
}

const DeckList: React.FC<Props> = (props) => {
	const { className } = props
	const { state, actions } = useContext(AppContext)

	const handleNewDeck = useCallback(async () => {
		if (!state.user) return

		await actions.addDeck(
			template.newDeck(state.decks.length)
		)
	}, [state.decks, state.user])

	const handleDragEnd = useCallback(
		(result: DropResult) => {
			if (!result.destination) return
			const { source, destination } = result
			if (source.index === destination.index) return
			const reorderedDecks = reorder(
				state.decks,
				source.index,
				destination.index
			)
			actions.setDecks(reorderedDecks)
			database.updateDecks(reorderedDecks)
		},
		[state.decks]
	)

	return (
		<div
			className={clsx(
				'overflow-y-auto hide-scrollbar flex-grow flex relative flex-col items-center gap-y-2 w-full',
				className
			)}>
			{state.decks.length > 0 ? (
				<DragDropContext onDragEnd={handleDragEnd}>
					<Droppable droppableId='droppable'>
						{(provided) => (
							<div
								className='w-full flex flex-col'
								ref={provided.innerRef}
								{...provided.droppableProps}>
								{state.decks.map((deck, idx) => (
									<Draggable
										draggableId={`draggable-${deck.id}`}
										key={deck.id}
										index={idx}>
										{(pr) => (
											<div
												className={classNames({
													hidden: state.activeTag && !deck.tags.some((t) => state.activeTag && t.id === state.activeTag.id)
												})}
												ref={pr.innerRef}
												{...pr.draggableProps}>
												<DeckPreview
													deck={deck}
													handleProps={
														pr.dragHandleProps
													}
												/>
											</div>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			) : (
				<p className='max-w-sm text-center'>
					A card deck is a collection of cards used to practice a
					certain topic.
				</p>
			)}
			<div className='mt-4 pb-4'>
				<button onClick={handleNewDeck} className='btn-primary'>
					<PlusCircle /> Add deck
				</button>
			</div>
		</div>
	)
}

export default DeckList

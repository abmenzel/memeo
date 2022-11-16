import {
	ArrowLeft,
	ArrowRight,
	Check,
	Edit,
	Edit2,
	Edit3,
	Plus,
	PlusCircle,
	PlusSquare,
	RotateCw,
	Shuffle,
	Trash2,
	X,
} from 'lucide-react'
import React, { useContext, useState } from 'react'
import { AppContext } from '../context/app'
import { deleteCard } from '../lib/api'
import Card from '../models/Card'
import { Types } from '../reducers/reducers'
import Stars from './Stars'
import ToolbarItem from './ToolbarItem'

const Toolbar = ({
	activeCard,
	activeCardIdx,
	nextCard,
	prevCard,
	handleNewCard,
	handleNewRating,
	setFlipCard,
	handleEdit,
	editing,
	handleShuffle,
	setActiveCardIdx,
}: {
	activeCard: Card
	activeCardIdx: number
	nextCard: () => void
	prevCard: () => void
	handleNewRating: Function
	handleNewCard: () => void
	setFlipCard: () => void
	handleEdit: (event: React.MouseEvent) => void
	editing: Card | null
	handleShuffle: () => void
	setActiveCardIdx: (idx: number) => void
}) => {
	const [deleting, setDeleting] = useState<boolean>(false)
	const { dispatch } = useContext(AppContext)

	const handleDeleting = () => {
		if (deleting) {
			setDeleting(false)
		} else {
			setDeleting(true)
		}
	}

	const handleDelete = () => {
		dispatch({
			type: Types.DeleteCard,
			payload: activeCard,
		})
		deleteCard(activeCard)
		setDeleting(false)
		setActiveCardIdx(activeCardIdx - 1)
	}

	return (
		<div className='flex flex-col items-center justify-center'>
			<div className='py-12 flex flex-col items-center'>
				<p className='text-xs mb-4'>Confidence</p>
				<div className='flex items-center gap-x-4'>
					<ToolbarItem
						icon={<ArrowLeft size={'1.75rem'} />}
						callback={prevCard}
					/>
					{activeCard && (
						<Stars
							rating={activeCard.rating}
							size={'1.75rem'}
							callback={handleNewRating}
						/>
					)}
					<ToolbarItem
						icon={<ArrowRight size={'1.75rem'} />}
						callback={nextCard}
					/>
				</div>
			</div>
			{deleting ? (
				<div className='py-4 flex gap-x-4 justify-center'>
					<button className='btn-secondary' onClick={handleDelete}>
						<Trash2 size={'1.25rem'} /> Delete
					</button>
					<button className='btn-primary' onClick={handleDeleting}>
						<X size={'1.25rem'} /> Cancel
					</button>{' '}
				</div>
			) : (
				<div className='py-4 flex gap-x-4 justify-center'>
					<ToolbarItem
						icon={
							editing?.id === activeCard?.id ? (
								<Check size={'1.25rem'} />
							) : (
								<Edit size={'1.25rem'} />
							)
						}
						callback={handleEdit}
					/>
					<ToolbarItem
						icon={<Shuffle size={'1.25rem'} />}
						callback={handleShuffle}
					/>
					<ToolbarItem
						icon={<RotateCw size={'1.25rem'} />}
						callback={setFlipCard}
					/>
					<ToolbarItem
						icon={<PlusCircle size={'1.25rem'} />}
						callback={handleNewCard}
					/>
					<ToolbarItem
						icon={<Trash2 size={'1.25rem'} />}
						callback={handleDeleting}
					/>
				</div>
			)}
		</div>
	)
}

export default Toolbar

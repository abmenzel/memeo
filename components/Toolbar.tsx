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
	nextCard,
	prevCard,
	handleNewCard,
	handleNewRating,
	setFlipCard,
	handleEdit,
	editing,
}: {
	activeCard: Card
	nextCard: () => void
	prevCard: () => void
	handleNewRating: Function
	handleNewCard: () => void
	setFlipCard: () => void
	handleEdit: (event: React.MouseEvent) => void
	editing: Card | null
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
	}

	return (
		<div className='flex flex-col items-center justify-center'>
			<div className='py-12 flex flex-col items-center'>
				<p className='text-xs mb-4'>Confidence</p>
				{activeCard && (
					<Stars
						rating={activeCard.rating}
						size={'1.75rem'}
						callback={handleNewRating}
					/>
				)}
			</div>
			{deleting ? (
				<div className='py-4 flex gap-x-4 justify-center'>
					<p className='font-bold'>Delete ? </p>
					<button className='btn-primary' onClick={handleDelete}>
						<Check size={'1rem'} />
					</button>
					<button className='btn-primary' onClick={handleDeleting}>
						<X size={'1rem'} />
					</button>{' '}
				</div>
			) : (
				<div className='py-4 flex gap-x-4 justify-center'>
					<ToolbarItem
						icon={<ArrowLeft size={'1rem'} />}
						callback={prevCard}
					/>
					<ToolbarItem
						icon={
							editing?.id === activeCard?.id ? (
								<Check size={'1rem'} />
							) : (
								<Edit size={'1rem'} />
							)
						}
						callback={handleEdit}
					/>
					<ToolbarItem
						icon={<RotateCw size={'1rem'} />}
						callback={setFlipCard}
					/>
					<ToolbarItem
						icon={<PlusCircle size={'1rem'} />}
						callback={handleNewCard}
					/>
					<ToolbarItem
						icon={<Trash2 size={'1rem'} />}
						callback={handleDeleting}
					/>
					<ToolbarItem
						icon={<ArrowRight size={'1rem'} />}
						callback={nextCard}
					/>
				</div>
			)}
		</div>
	)
}

export default Toolbar

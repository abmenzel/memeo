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
import ToolbarItem from './ToolbarItem'

const Toolbar = ({
	activeCard,
	nextCard,
	prevCard,
	handleNewCard,
	setFlipCard,
	handleEdit,
	editing,
}: {
	activeCard: Card
	nextCard: () => void
	prevCard: () => void
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
		<div className='h-20 flex items-center justify-center'>
			{deleting ? (
				<div className='py-4 flex gap-x-4 justify-center'>
					<p className='font-bold'>Delete ? </p>
					<button className='btn-primary' onClick={handleDelete}>
						<Check size={18} />
					</button>
					<button className='btn-primary' onClick={handleDeleting}>
						<X size={18} />
					</button>{' '}
				</div>
			) : (
				<div className='py-4 flex gap-x-4 justify-center'>
					<ToolbarItem
						icon={<ArrowLeft size={18} />}
						callback={prevCard}
					/>
					<ToolbarItem
						icon={
							editing?.id === activeCard?.id ? (
								<Check size={18} />
							) : (
								<Edit size={18} />
							)
						}
						callback={handleEdit}
					/>
					<ToolbarItem
						icon={<RotateCw size={18} />}
						callback={setFlipCard}
					/>
					<ToolbarItem
						icon={<PlusCircle size={18} />}
						callback={handleNewCard}
					/>
					<ToolbarItem
						icon={<Trash2 size={18} />}
						callback={handleDeleting}
					/>
					<ToolbarItem
						icon={<ArrowRight size={18} />}
						callback={nextCard}
					/>
				</div>
			)}
		</div>
	)
}

export default Toolbar

import {
	ArrowRight,
	Check,
	Edit,
	Edit2,
	Edit3,
	Plus,
	PlusCircle,
	PlusSquare,
	RotateCw,
} from 'lucide-react'
import React from 'react'
import Card from '../models/Card'
import ToolbarItem from './ToolbarItem'

const Toolbar = ({
	activeCard,
	nextCard,
	handleNewCard,
	setFlipCard,
	handleEdit,
	editing,
}: {
	activeCard: Card
	nextCard: () => void
	handleNewCard: () => void
	setFlipCard: () => void
	handleEdit: (event: React.MouseEvent) => void
	editing: Card | null
}) => {
	return (
		<div className='flex gap-x-2 justify-center'>
			<ToolbarItem
				icon={editing?.id === activeCard?.id ? <Check /> : <Edit />}
				callback={handleEdit}
			/>
			<ToolbarItem icon={<RotateCw />} callback={setFlipCard} />
			<ToolbarItem icon={<PlusCircle />} callback={handleNewCard} />
			<ToolbarItem icon={<ArrowRight />} callback={nextCard} />
		</div>
	)
}

export default Toolbar

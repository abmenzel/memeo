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
import ToolbarItem from './ToolbarItem'

const Toolbar = ({
	nextCard,
	newCard,
	setFlipCard,
	handleEditClick,
	editing,
}: {
	nextCard: Function
	newCard: Function
	setFlipCard: Function
	handleEditClick: Function
	editing: boolean
}) => {
	return (
		<div className='flex gap-x-2 justify-center'>
			<ToolbarItem
				icon={editing ? <Check /> : <Edit />}
				callback={handleEditClick}
			/>
			<ToolbarItem icon={<RotateCw />} callback={setFlipCard} />
			<ToolbarItem icon={<PlusCircle />} callback={newCard} />
			<ToolbarItem icon={<ArrowRight />} callback={nextCard} />
		</div>
	)
}

export default Toolbar

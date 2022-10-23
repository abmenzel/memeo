import { ArrowRight, Check, Edit, Edit2, Edit3, RotateCw } from 'lucide-react'
import React from 'react'
import ToolbarItem from './ToolbarItem'

const Toolbar = ({
	nextCard,
	setFlipCard,
	handleEditClick,
	editing,
}: {
	nextCard: Function
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
			<ToolbarItem icon={<ArrowRight />} callback={nextCard} />
		</div>
	)
}

export default Toolbar

import { Check, Edit3, Trash2, X } from 'lucide-react'
import React from 'react'
import Deck from '../models/Deck'

type DeckPreviewToolbarProps = {
	deleting: boolean
	editing: null | Deck
	handleDelete: (event: React.MouseEvent) => void
	handleDeleting: (event: React.MouseEvent) => void
	handleEdit: (event: React.MouseEvent) => void
}

const DeckPreviewToolbar = ({
	deleting,
	handleDelete,
	handleDeleting,
	handleEdit,
	editing,
}: DeckPreviewToolbarProps) => {
	return (
		<>
			{deleting ? (
				<div className='flex items-center gap-x-2 flex-grow justify-end'>
					<p className='font-bold'>Delete ? </p>
					<button className='btn-primary' onClick={handleDelete}>
						<Check size={18} />
					</button>
					<button className='btn-primary' onClick={handleDeleting}>
						<X size={18} />
					</button>
				</div>
			) : (
				<div className='flex flex-grow justify-end gap-x-2 opacity-0 group-hover:opacity-100 transition-opacity'>
					<button className='btn-primary' onClick={handleEdit}>
						{editing ? <Check size={18} /> : <Edit3 size={18} />}
					</button>
					<button className='btn-primary' onClick={handleDeleting}>
						<Trash2 size={18} />
					</button>
				</div>
			)}
		</>
	)
}

export default DeckPreviewToolbar

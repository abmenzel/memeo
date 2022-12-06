import {
	Check,
	Edit3,
	GripVertical,
	MoreVertical,
	Tag,
	Trash2,
	X,
} from 'lucide-react'
import { Menu, Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useEffect, useState } from 'react'
import Deck from '../models/Deck'
import DeleteModal from './DeleteModal'
import TagModal from './TagModal'

type DeckPreviewToolbarProps = {
	deck: Deck
	deleting: boolean
	editing: null | Deck
	handleDelete: (event: React.MouseEvent) => void
	setDeleting: Function
	handleEdit: (event: React.MouseEvent) => void
	handleProps: any
}

const DeckPreviewToolbar = ({
	deck,
	deleting,
	handleDelete,
	setDeleting,
	handleEdit,
	editing,
	handleProps,
}: DeckPreviewToolbarProps) => {
	const [tagging, setTagging] = useState(false)

	return (
		<>
			<DeleteModal
				setDeleting={setDeleting}
				deleting={deleting}
				handleDelete={handleDelete}
				deck={deck}
			/>
			<TagModal tagging={tagging} setTagging={setTagging} deck={deck} />
			<Menu>
				<div className='relative'>
					<Menu.Button
						onClick={(event: React.MouseEvent) =>
							event.stopPropagation()
						}>
						<span className='btn-secondary'>
							<MoreVertical size={'1rem'} />
						</span>
					</Menu.Button>
					<Menu.Items className='bg-orange-100 z-10 absolute right-0 border border-black rounded-md flex flex-col'>
						<Menu.Item>
							<button
								className='btn-secondary p-2 pr-4 rounded-none'
								onClick={(event) => {
									handleEdit(event)
								}}>
								<Edit3 size={'1rem'} /> Rename
							</button>
						</Menu.Item>
						<Menu.Item>
							<button
								className='btn-secondary p-2 pr-4 rounded-none'
								onClick={(event) => {
									event.stopPropagation()
									setDeleting(true)
								}}>
								<Trash2 size={'1rem'} /> Delete
							</button>
						</Menu.Item>
						<Menu.Item>
							<button
								className='btn-secondary p-2 pr-4 rounded-none'
								onClick={(event) => {
									event.stopPropagation()
									setTagging(true)
								}}>
								<Tag size={'1rem'} /> Tag
							</button>
						</Menu.Item>
					</Menu.Items>
				</div>
			</Menu>
			<button {...handleProps} className='btn-secondary'>
				<GripVertical size='1rem' />
			</button>
		</>
	)
}

export default DeckPreviewToolbar

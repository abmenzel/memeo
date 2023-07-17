import { Menu } from '@headlessui/react'
import {
	Copy,
	Edit3,
	GripVertical,
	MoreVertical,
	Tag,
	Trash2,
} from 'lucide-react'
import React, { Fragment, useContext, useState } from 'react'
import { AppContext } from '../context/app'
import Deck from '../models/Deck'
import TagModal from './TagModal'
import { Button } from './ui'

type DeckPreviewToolbarProps = {
	deck: Deck
	deleting: boolean
	setContextMenuOpen: (open: boolean) => void
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
	setContextMenuOpen,
	handleProps,
}: DeckPreviewToolbarProps) => {
	const [tagging, setTagging] = useState(false)
	const { actions } = useContext(AppContext)
	const { showModal } = actions
	return (
		<>
			<TagModal tagging={tagging} setTagging={setTagging} deck={deck} />
			<Menu>
				{({ open }) => {
					if (open) {
						setContextMenuOpen(true)
					} else {
						setTimeout(() => {
							setContextMenuOpen(false)
						}, 100)
					}
					return (
						<div className='relative'>
							<Button
								onClick={(event: React.MouseEvent) =>
									event.stopPropagation()
								}>
								<Menu.Button as={Fragment}>
									<MoreVertical size={'1rem'} />
								</Menu.Button>
							</Button>

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
											setTagging(true)
										}}>
										<Tag size={'1rem'} /> Tag
									</button>
								</Menu.Item>
								<Menu.Item>
									<Button
										rounded={false}
										animateScale={false}
										onClick={(event) => {
											event.stopPropagation()
											actions.duplicateDeck(deck)
										}}>
										<Copy size={'1rem'} /> Duplicate
									</Button>
								</Menu.Item>
								<Menu.Item>
									<Button
										animateScale={false}
										rounded={false}
										onClick={(event) =>
											showModal({
												title: `Delete ${deck.title}?`,
												icon: <Trash2 size={'1rem'} />,
												description:
													'This will permanently delete this card deck.',
												onConfirm: () =>
													handleDelete(event),
											})
										}>
										<Trash2 size={'1rem'} /> Delete
									</Button>
								</Menu.Item>
							</Menu.Items>
						</div>
					)
				}}
			</Menu>
			<button {...handleProps} className='btn-secondary'>
				<GripVertical size='1rem' />
			</button>
		</>
	)
}

export default DeckPreviewToolbar

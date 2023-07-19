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
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd'
import { AppContext } from '../context/app'
import Deck from '../models/Deck'
import TagModal from './TagModal'
import TagPicker from './TagPicker'
import { Button } from './ui'

type DeckPreviewToolbarProps = {
	deck: Deck
	setContextMenuOpen: (open: boolean) => void
	handleDelete: (event: React.MouseEvent) => void
	handleEdit: (event: React.MouseEvent) => void
	handleProps: DraggableProvidedDragHandleProps
}

const DeckPreviewToolbar = ({
	deck,
	handleDelete,
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
									<Button
										rounded={false}
										animateScale={false}
										onClick={(event) => {
											handleEdit(event)
										}}>
										<Edit3 size={'1rem'} /> Rename
									</Button>
								</Menu.Item>

								<Menu.Item>
									<Button
										rounded={false}
										animateScale={false}
										onClick={() =>
											showModal({
												title: `Tag ${deck.title}`,
												component: (
													<TagPicker
														deck={deck}
														className='mb-2'
													/>
												),
											})
										}>
										<Tag size={'1rem'} /> Tag
									</Button>
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
			<Button {...handleProps}>
				<GripVertical size='1rem' />
			</Button>
		</>
	)
}

export default DeckPreviewToolbar

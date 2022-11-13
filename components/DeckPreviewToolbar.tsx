import { Check, Edit3, MoreVertical, Trash2, X } from 'lucide-react'
import { Menu, Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useEffect } from 'react'
import Deck from '../models/Deck'

type DeckPreviewToolbarProps = {
	deck: Deck
	deleting: boolean
	editing: null | Deck
	handleDelete: (event: React.MouseEvent) => void
	setDeleting: Function
	handleEdit: (event: React.MouseEvent) => void
}

const DeckPreviewToolbar = ({
	deck,
	deleting,
	handleDelete,
	setDeleting,
	handleEdit,
	editing,
}: DeckPreviewToolbarProps) => {
	return (
		<>
			<Transition as={Fragment} show={deleting}>
				<Dialog
					onClose={(e) => setDeleting(false)}
					className='relative z-50'>
					<div className='fixed inset-0 flex items-center justify-center p-4 backdrop-blur-sm'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'>
							<Dialog.Panel className='w-full flex flex-col items-center max-w-sm rounded-md bg-orange-100 border border-black text-black p-4 text-center'>
								<Dialog.Title className='text-xl font-bold font-serif mb-2'>
									Delete {deck.title}?
								</Dialog.Title>
								<Dialog.Description className='text-sm mb-4 w-56'>
									This will permanently delete this card deck.
								</Dialog.Description>
								<div className='flex gap-x-2'>
									<button className='btn-secondary'>
										<Trash2
											size={'1rem'}
											onClick={(e) => {
												handleDelete(e)
											}}
										/>{' '}
										Delete
									</button>
									<button
										className='btn-secondary'
										onClick={() => setDeleting(false)}>
										<X size={'1rem'} />
										Cancel
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
			<Menu>
				<div className='relative'>
					<Menu.Button>
						<span className='btn-secondary'>
							<MoreVertical size={'1rem'} />
						</span>
					</Menu.Button>
					<Menu.Items className='bg-orange-100 z-10 absolute right-0 border border-black rounded-md'>
						<Menu.Item>
							<button
								className='btn-secondary p-2 pr-4'
								onClick={handleEdit}>
								<Edit3 size={'1rem'} /> Rename
							</button>
						</Menu.Item>
						<Menu.Item>
							<button
								className='btn-secondary p-2 pr-4'
								onClick={() => setDeleting(true)}>
								<Trash2 size={'1rem'} /> Delete
							</button>
						</Menu.Item>
					</Menu.Items>
				</div>
			</Menu>
		</>
	)
}

export default DeckPreviewToolbar

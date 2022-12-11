import { Dialog, Transition } from '@headlessui/react'
import { Trash2, X } from 'lucide-react'
import { Fragment } from 'react'
import Deck from '../models/Deck'

type DeleteModalProps = {
	setDeleting: Function
	deck: Deck
	handleDelete: Function
	deleting: boolean
}

const DeleteModal = (props: DeleteModalProps) => {
	return (
		<Transition as={Fragment} show={props.deleting}>
			<Dialog
				onClick={(event: any) => event.stopPropagation()}
				onClose={() => {
					props.setDeleting(false)
				}}
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
								Delete {props.deck.title}?
							</Dialog.Title>
							<Dialog.Description className='text-sm mb-4 w-56'>
								This will permanently delete this card deck.
							</Dialog.Description>
							<div className='flex gap-x-2'>
								<button
									onClick={(e) => {
										props.handleDelete(e)
									}}
									className='btn-secondary'>
									<Trash2 size={'1rem'} />
									Delete
								</button>
								<button
									className='btn-primary font-base'
									onClick={() => props.setDeleting(false)}>
									<X size={'1rem'} />
									Cancel
								</button>
							</div>
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	)
}

export default DeleteModal

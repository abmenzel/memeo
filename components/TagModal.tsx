import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Deck from '../models/Deck'
import TagPicker from './TagPicker'

type TagModalProps = {
	setTagging: Function
	tagging: boolean
	deck: Deck
}

const TagModal = (props: TagModalProps) => {
	const { tagging, setTagging, deck } = props

	return (
		<Transition as={Fragment} show={tagging}>
			<Dialog
				onClick={(event: any) => event.stopPropagation()}
				onClose={() => setTagging(false)}
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
								Add tag to {props.deck.title}
							</Dialog.Title>
							<TagPicker deck={props.deck} />
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	)
}

export default TagModal

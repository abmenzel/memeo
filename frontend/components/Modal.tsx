import { Dialog } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ModalState } from '../models/ModalState'
import { Button } from './ui'

type Props = ModalState & {
	onClose: Function
	className?: string
}

const Modal: React.FC<Props> = (props) => {
	const { show, options, onClose } = props
	const [showModal, setShowModal] = useState<boolean>(show)

	useEffect(() => {
		setShowModal(show)
	}, [show])

	return (
		<AnimatePresence>
			{showModal && (
				<Dialog
					key={options.title}
					onClick={(event: any) => event.stopPropagation()}
					open={showModal}
					onClose={() => onClose()}
					className='relative z-50'>
					<motion.div
						className='fixed inset-0 bg-black bg-opacity-20'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => onClose()}
					/>
					<motion.div
						className='fixed inset-0 z-10 flex items-end justify-center'
						transition={{
							ease: 'easeInOut',
							duration: 0.15,
						}}
						initial={{ y: '100%' }}
						animate={{ y: 0 }}
						exit={{ y: '100%' }}>
						<Dialog.Panel className='w-full rounded-t-2xl bg-orange-100 border-t border-black text-black p-4'>
							<Dialog.Title className='text-xl font-bold font-serif mb-2'>
								{options.title}
							</Dialog.Title>
							{options.component}
							{options.description && (
								<Dialog.Description className='text-sm mb-4'>
									{options.description}
								</Dialog.Description>
							)}
							<div className='flex gap-x-2'>
								{options.onConfirm && (
									<Button
										variant='primary'
										onClick={() => {
											options.onConfirm &&
												options.onConfirm()
											onClose()
										}}>
										{options.icon ? (
											options.icon
										) : (
											<Check size='1em' />
										)}
										Confirm
									</Button>
								)}
							</div>
						</Dialog.Panel>
					</motion.div>
				</Dialog>
			)}
		</AnimatePresence>
	)
}

export default Modal

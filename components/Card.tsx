import { TextareaAutosize } from '@mui/material'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import {
	ChangeEvent,
	ChangeEventHandler,
	KeyboardEvent,
	KeyboardEventHandler,
	MouseEventHandler,
	useEffect,
	useRef,
	useState,
} from 'react'
import { useDoubleTap } from 'use-double-tap'
import { usePrevious } from '../hooks/usePrevious'
import Card from '../models/Card'

const Card = ({
	card,
	flipCard,
	direction,
	editing,
	activeCardInputRef,
	setFlipCard,
	setEditing,
}: {
	direction: 'left' | 'right'
	card: Card
	setFlipCard: Function
	flipCard: boolean
	editing: Card | null
	activeCardInputRef: any
	setEditing: Function
}) => {
	const [front, setFront] = useState<string>(card.front)
	const [back, setBack] = useState<string>(card.back)
	const previousCard: Card | null = usePrevious<Card | null>(card)

	const wrapperRef = useRef<HTMLDivElement>(null)

	const bind = useDoubleTap(() => {
		setEditing(card)
	})

	const disableFront = !(front.length === 0 || editing?.id === card.id)
	const disableBack = !(back.length === 0 || editing?.id === card.id)

	useEffect(() => {
		setFront(card.front)
		setBack(card.back)
		if (wrapperRef.current) {
			wrapperRef.current.style.animation = 'none'
			wrapperRef.current.offsetHeight
			wrapperRef.current.style.animation = ''
		}
	}, [card])

	const changeFront: ChangeEventHandler<HTMLTextAreaElement> = (
		event: ChangeEvent
	) => {
		setFront((event.target as HTMLInputElement).value)
	}
	const changeBack: ChangeEventHandler<HTMLTextAreaElement> = (
		event: ChangeEvent
	) => {
		setBack((event.target as HTMLInputElement).value)
	}

	const handleBlur = () => {
		if (!editing) return
		setTimeout(() => {
			setEditing(null)
		}, 100)
	}

	const handleCardClick: MouseEventHandler<Element> = (event) => {
		if (!editing) {
			setFlipCard(!flipCard)
		}
	}

	const handleTextClick = (event: any, disabled: boolean) => {
		if (!disabled) {
			event.stopPropagation()
			setEditing(card)
		}
	}

	const handleKey: KeyboardEventHandler<HTMLTextAreaElement> = (
		event: KeyboardEvent
	): void => {
		if (!editing) return
		if (
			(event.code === 'Enter' && event.shiftKey == false) ||
			event.code === 'Escape'
		) {
			setEditing(null)
		}
	}

	return (
		<AnimatePresence mode='popLayout' initial={false}>
			<motion.div
				initial={{
					x:
						direction === 'right'
							? 'calc(100% + 1rem)'
							: 'calc(-100% - 1rem)',
					opacity: 0,
					rotate: direction === 'right' ? '5deg' : '-5deg',
				}}
				animate={{ x: 0, opacity: 1, rotate: '0deg' }}
				exit={{
					x:
						direction === 'left'
							? 'calc(100% + 1rem)'
							: 'calc(-100% - 1rem)',
					opacity: 0,
					rotate: direction === 'left' ? '5deg' : '-5deg',
				}}
				key={card.id}
				transition={{ duration: 0.2, ease: 'easeOut' }}
				ref={wrapperRef}
				className={clsx('relative flex text-center w-full max-w-md')}>
				<div
					{...bind}
					className='font-serif w-full flex items-center overflow-visible'>
					<div
						onClick={handleCardClick}
						className={`${
							flipCard && 'opacity-0 pointer-events-none'
						} w-full shrink-0 transition-all cursor-pointer`}>
						<div
							className={`${
								flipCard && 'opacity-0 rotate-xy-180'
							} max-h-96 overflow-y-auto transition-all duration-300 border rounded-md flex items-center justify-center bg-gradient-to-br to-orange-150 bg-opacity-5 from-orange-75 aspect-video border-gray-600 border-opacity-10 shadow-xl shadow-orange-175 hover:shadow-2xl`}>
							<TextareaAutosize
								ref={!flipCard ? activeCardInputRef : null}
								disabled={disableFront}
								className={`appearance-none font-serif outline-none transition-none text-center bg-transparent font-bold resize-none ${
									(front.length > 80 && 'text-md') ||
									(front.length > 60 && 'text-lg') ||
									(front.length > 40 && 'text-xl') ||
									(front.length > 10 && 'text-2xl') ||
									(front.length > 4 && 'text-3xl') ||
									'text-4xl'
								}`}
								value={front}
								placeholder={'Card front'}
								onClick={(event) =>
									handleTextClick(event, disableFront)
								}
								onChange={changeFront}
								onKeyDown={handleKey}
								onBlur={handleBlur}
							/>
						</div>
					</div>
					<div
						onClick={handleCardClick}
						className={`${
							!flipCard && 'opacity-0 pointer-events-none'
						} w-full shrink-0 -translate-x-full transition-all cursor-pointer`}>
						<div
							className={`${
								!flipCard && 'opacity-0 -rotate-xy-180'
							} max-h-96 overflow-y-auto transition-all duration-300 border rounded-md flex items-center justify-center bg-gradient-to-br to-orange-150 bg-opacity-5 from-orange-75 aspect-video border-gray-600 border-opacity-10 shadow-xl shadow-orange-175 hover:shadow-2xl`}>
							<TextareaAutosize
								ref={flipCard ? activeCardInputRef : null}
								disabled={disableBack}
								className={`transition-none outline-none text-center bg-transparent resize-none ${
									(back.length > 80 && 'text-sm') ||
									(back.length > 60 && 'text-md') ||
									(back.length > 40 && 'text-lg') ||
									(back.length > 10 && 'text-xl') ||
									(back.length > 4 && 'text-2xl') ||
									'text-3xl'
								}`}
								value={back}
								placeholder={'Card back'}
								onClick={(event) =>
									handleTextClick(event, disableBack)
								}
								onKeyDown={handleKey}
								onChange={changeBack}
								onBlur={handleBlur}
							/>
						</div>
					</div>
				</div>
			</motion.div>
		</AnimatePresence>
	)
}

export default Card

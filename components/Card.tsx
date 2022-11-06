import { TextareaAutosize } from '@mui/material'
import React, {
	ChangeEvent,
	KeyboardEventHandler,
	KeyboardEvent,
	useEffect,
	useState,
	ChangeEventHandler,
	MouseEventHandler,
} from 'react'
import { CSSTransition } from 'react-transition-group'
import Card from '../models/Card'

const Card = ({
	card,
	flipCard,
	editing,
	activeCardInputRef,
	setFlipCard,
	setEditing,
}: {
	card: Card
	setFlipCard: Function
	flipCard: boolean
	editing: Card | null
	activeCardInputRef: any
	setEditing: Function
}) => {
	const [front, setFront] = useState<string>(card.front)
	const [back, setBack] = useState<string>(card.back)
	const [clicks, setClicks] = useState<number>(0)

	useEffect(() => {
		setFront(card.front)
		setBack(card.back)
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
		setEditing(null)
		setClicks(0)
	}

	const handleClick: MouseEventHandler<Element> = (event) => {
		event.stopPropagation()
		if (!editing) {
			setFlipCard(!flipCard)
		}
	}

	useEffect(() => {}, [clicks])

	useEffect(() => {
		setClicks(0)
	}, [flipCard])

	const handleKey: KeyboardEventHandler<HTMLTextAreaElement> = (
		event: KeyboardEvent
	): void => {
		if (!editing) return
		if (
			(event.code === 'Enter' && event.shiftKey == false) ||
			event.code === 'Escape'
		) {
			setEditing(false)
		}
	}

	return (
		<div className='relative flex text-center w-full max-w-md'>
			<div className='font-ser w-full flex items-center overflow-visible'>
				<div
					onClick={handleClick}
					className={`${
						flipCard && 'opacity-0 pointer-events-none'
					} w-full shrink-0 transition-all cursor-pointer`}>
					<div
						className={`${
							flipCard && 'opacity-0 rotate-xy-180'
						} max-h-96 overflow-y-auto transition-all duration-300 border rounded-md flex items-center justify-center bg-gradient-to-br to-orange-150 bg-opacity-5 from-orange-75 aspect-video border-gray-600 border-opacity-10 shadow-xl shadow-orange-175 hover:shadow-2xl`}>
						<TextareaAutosize
							ref={!flipCard ? activeCardInputRef : null}
							disabled={!(editing?.id === card.id)}
							className={`font-serif outline-none transition-none text-center bg-transparent font-bold resize-none ${
								(front.length > 80 && 'text-md') ||
								(front.length > 60 && 'text-lg') ||
								(front.length > 40 && 'text-xl') ||
								(front.length > 10 && 'text-2xl') ||
								(front.length > 4 && 'text-3xl') ||
								'text-4xl'
							}`}
							value={front}
							placeholder={'Card front'}
							onChange={changeFront}
							onKeyDown={handleKey}
							onBlur={handleBlur}
						/>
					</div>
				</div>
				<div
					onClick={handleClick}
					className={`${
						!flipCard && 'opacity-0 pointer-events-none'
					} w-full shrink-0 -translate-x-full transition-all cursor-pointer`}>
					<div
						className={`${
							!flipCard && 'opacity-0 -rotate-xy-180'
						} max-h-96 overflow-y-auto transition-all duration-300 border rounded-md flex items-center justify-center bg-gradient-to-br to-orange-150 bg-opacity-5 from-orange-75 aspect-video border-gray-600 border-opacity-10 shadow-xl shadow-orange-175 hover:shadow-2xl`}>
						<TextareaAutosize
							ref={flipCard ? activeCardInputRef : null}
							disabled={!(editing?.id === card.id)}
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
							onKeyDown={handleKey}
							onChange={changeBack}
							onBlur={handleBlur}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Card

import { TextareaAutosize } from '@mui/material'
import React, {
	ChangeEvent,
	KeyboardEventHandler,
	KeyboardEvent,
	useEffect,
	useState,
	ChangeEventHandler,
} from 'react'
import { CSSTransition } from 'react-transition-group'
import Card from '../models/Card'

const Card = ({
	card,
	flipCard,
	editing,
	activeCardInputRef,
	setEditing,
}: {
	card: Card
	flipCard: boolean
	editing: Card | null
	activeCardInputRef: any
	setEditing: Function
}) => {
	const [front, setFront] = useState<string>(card.front)
	const [back, setBack] = useState<string>(card.back)

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
	}

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
		<div className='relative my-24 flex text-center w-full'>
			<div className='w-2xfull flex items-center overflow-x-hidden'>
				<div
					className={`${
						flipCard && 'pointer-events-none'
					} w-full shrink-0`}>
					<TextareaAutosize
						ref={!flipCard ? activeCardInputRef : null}
						disabled={!(editing?.id === card.id)}
						className={`${
							flipCard ? ' opacity-0 rotate-x-180' : ''
						} outline-none focus:border-transparent text-center bg-transparent transition-all font-bold text-3xl leading-6 duration-300 resize-none`}
						value={front}
						placeholder={'Card front'}
						onChange={changeFront}
						onKeyDown={handleKey}
						onBlur={handleBlur}
					/>
				</div>
				<div
					className={`${
						!flipCard && 'pointer-events-none'
					} w-full shrink-0 -translate-x-full `}>
					<TextareaAutosize
						ref={flipCard ? activeCardInputRef : null}
						disabled={!(editing?.id === card.id)}
						className={`text-2xl transition-all leading-6 ${
							!flipCard ? 'opacity-0 -rotate-x-180' : ''
						} outline-none text-center bg-transparent transition-all duration-300 resize-none`}
						value={back}
						placeholder={'Card back'}
						onKeyDown={handleKey}
						onChange={changeBack}
						onBlur={handleBlur}
					/>
				</div>
			</div>
		</div>
	)
}

export default Card

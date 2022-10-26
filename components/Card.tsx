import { TextareaAutosize } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import Card from '../models/Card'

const Card = ({
	cardIdx,
	cards,
	flipCard,
	editing,
	setCards,
	activeCardInputRef,
}: {
	cardIdx: number
	cards: Card[]
	flipCard: boolean
	editing: boolean
	setCards: Function
	activeCardInputRef: any
}) => {
	const changeFront = (event: ChangeEvent) => {
		const newCards = [...cards]
		newCards[cardIdx].front = (event.target as HTMLInputElement).value
		setCards(newCards)
	}
	const changeBack = (event: ChangeEvent) => {
		const newCards = [...cards]
		newCards[cardIdx].back = (event.target as HTMLInputElement).value
		setCards(newCards)
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
						disabled={!editing}
						className={`${
							flipCard ? ' opacity-0 rotate-x-180' : ''
						} outline-none focus:border-transparent text-center bg-transparent transition-all font-bold text-3xl leading-6 duration-300 resize-none`}
						value={cards[cardIdx].front}
						placeholder={'Card front'}
						onChange={changeFront}
					/>
				</div>
				<div
					className={`${
						!flipCard && 'pointer-events-none'
					} w-full shrink-0 -translate-x-full `}>
					<TextareaAutosize
						ref={flipCard ? activeCardInputRef : null}
						disabled={!editing}
						className={`text-2xl transition-all leading-6 ${
							!flipCard ? 'opacity-0 -rotate-x-180' : ''
						} outline-none text-center bg-transparent transition-all duration-300 resize-none`}
						value={cards[cardIdx].back}
						placeholder={'Card back'}
						onChange={changeBack}
					/>
				</div>
			</div>
		</div>
	)
}

export default Card

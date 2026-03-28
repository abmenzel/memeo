import { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../context/app'
import Deck from '../models/Deck'
import { Button } from './ui'

const DeckRename = (props: { deck: Deck }) => {
	const { actions } = useContext(AppContext)
	const { deck } = props
	const [input, setInput] = useState(deck.name)
	const handleSave = () => {
		actions.updateDeck({ ...deck, name: input })
		actions.hideModal()
	}
	const inputRef = useRef<HTMLInputElement>(null)
	useEffect(() => {
		setTimeout(() => {
			if (!inputRef.current) return
			inputRef.current.focus()
		}, 500) // Hack to get focus to work
	}, [inputRef])

	return (
		<div className='flex gap-4 items-center'>
			<input
				ref={inputRef}
				value={input}
				onChange={(event) => setInput(event.target.value)}
				className='bg-transparent font-semibold border-b border-black border-opacity-10 py-0.5 w-full outline-none'
			/>
			<Button onClick={handleSave} variant='primary'>
				Save
			</Button>
		</div>
	)
}

export default DeckRename

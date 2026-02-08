import clsx from 'clsx'
import { Check, PlusCircle, X } from 'lucide-react'
import { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../context/app'
import Deck from '../models/Deck'
import Tag from './Tag'
import { Button } from './ui'
import AutoResizedInput from './ui/AutoResizedInput'

type TagPickerProps = {
	deck: Deck
	className?: string
}

const tagColors = [
	'bg-red-200',
	'bg-green-200',
	'bg-blue-200',
	'bg-yellow-200',
	'bg-purple-200',
	'bg-pink-200',
]

const TagPicker: React.FC<TagPickerProps> = ({ deck, className }) => {
	const { state, actions } = useContext(AppContext)
	const [addingNewTag, setAddingNewTag] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (addingNewTag && inputRef.current) {
			inputRef.current.focus()
		}
	})

	const handleNewTag = async () => {
		if (!inputRef.current || !state.user) return
		const newTag = inputRef.current.value
		if (newTag.length > 0) {
			const createdTag = await actions.addTag({
				name: newTag,
				id: null,
				color: tagColors[Math.floor(Math.random() * tagColors.length)],
			})
			actions.updateDeck({
				...deck,
				tag_id: createdTag.id,
				tag: createdTag,
			})
			setAddingNewTag(false)
			actions.hideModal()
		}
	}

	return (
		<div className={clsx('flex', 'gap-2', 'flex-wrap', className)}>
			{addingNewTag ? (
				<div className='flex gap-2'>
					<AutoResizedInput ref={inputRef} placeholder='New tag' />
					<Button
						onClick={() => setAddingNewTag(false)}
						variant='secondary'
						className='border border-theme-dark'>
						<X size='1rem' />
					</Button>
					<Button onClick={() => handleNewTag()} variant='primary'>
						<Check size='1rem' />
					</Button>
				</div>
			) : (
				<>
					<Button
						onClick={() => setAddingNewTag(true)}
						variant='secondary'
						className='border border-theme-dark'>
						<PlusCircle size='1rem' /> New tag
					</Button>
					{state.tags.map((tag, index) => {
						const isSelected = tag.id === deck.tag_id
						return (
							<Tag
								onClick={() => {
									if (isSelected) {
										actions.updateDeck({
											...deck,
											tag_id: null,
											tag: undefined,
										})
									} else {
										actions.updateDeck({
											...deck,
											tag_id: tag.id,
											tag: tag,
										})
									}

									actions.hideModal()
								}}
								tag={tag}
								key={index}
								className={clsx(
									'px-2',
									'py-1.5',
									'rounded-md',
									'border',
									{
										'border-transparent': !isSelected,
									},
									{
										'border-theme-dark': isSelected,
									}
								)}
							/>
						)
					})}
				</>
			)}
		</div>
	)
}

export default TagPicker

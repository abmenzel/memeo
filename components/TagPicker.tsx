import { Combobox } from '@headlessui/react'
import classNames from 'classnames'
import { Menu, X } from 'lucide-react'
import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../context/app'
import Deck from '../models/Deck'
import Tag from '../models/Tag'
import { Types } from '../reducers/reducers'

const tagColors = [
	'bg-red-200',
	'bg-green-200',
	'bg-blue-200',
	'bg-yellow-200',
	'bg-purple-200',
	'bg-pink-200',
]

type TagPickerProps = {
	deck: Deck
}

const TagPicker = ({ deck }: TagPickerProps) => {
	const { state, dispatch } = useContext(AppContext)
	const [query, setQuery] = useState('')
	const [tags, setTags] = useState<Tag[]>([])
	const [selectedTag, setSelectedTag] = useState<Tag | undefined>(deck.tag)

	useEffect(() => {
		let existingTags: Tag[] = []
		state.decks.forEach((deck) => {
			if (deck.tag) {
				existingTags.push(deck.tag)
			}
		})
		setTags(existingTags)
	}, [])

	const filteredTags =
		query === ''
			? tags
			: tags
					.filter((tag) => {
						return tag.name
							.toLowerCase()
							.includes(query.toLowerCase())
					})
					.filter((tag) => tag.name !== selectedTag?.name)

	const handleChange = (tag: Tag) => {
		setSelectedTag(tag)
	}

	const handleNewTag = (name: string) => {
		const newTag = {
			name: name,
			color: tagColors[Math.floor(Math.random() * tagColors.length)],
		}
		setTags([...tags, newTag])
		setSelectedTag(newTag)
	}

	useEffect(() => {
		dispatch({
			type: Types.UpdateDeck,
			payload: {
				oldDeck: deck,
				newDeck: {
					...deck,
					tag: selectedTag,
				},
			},
		})
	}, [selectedTag])

	return (
		<Combobox
			value={selectedTag}
			onChange={handleChange}
			nullable={true}
			as={Fragment}>
			{({ open }) => (
				<div
					onClick={(event: any) => event.stopPropagation()}
					className='relative flex flex-col border border-black rounded-md text-sm'>
					<Combobox.Input
						onChange={(event) => setQuery(event.target.value)}
						className='rounded-md bg-transparent p-1.5 placeholder:text-black'
						displayValue={(selectedTag: Tag) => selectedTag?.name}
						value={selectedTag?.name}
						placeholder={
							tags.length > 0 ? 'Select tag' : 'Create a tag'
						}
					/>
					<Combobox.Button className='absolute right-0 p-1.5'>
						{tags.length > 0 && <>{open ? <X /> : <Menu />}</>}
					</Combobox.Button>
					<Combobox.Options
						className={classNames(
							'absolute top-10 bg-orange-100 w-full rounded-md border-black',
							{ border: filteredTags.length > 0 }
						)}>
						{filteredTags.map((tag) => (
							<Combobox.Option
								key={tag.name}
								value={tag}
								as={Fragment}>
								{({ active, selected }) => (
									<li
										className={classNames(
											'w-full',
											'btn-secondary'
										)}>
										<span
											className={classNames(
												'rounded-sm',
												'px-1',
												tag.color
											)}>
											{tag.name}
										</span>
									</li>
								)}
							</Combobox.Option>
						))}
						{query !== '' &&
							query.toLowerCase() !==
								selectedTag?.name.toLocaleLowerCase() &&
							!filteredTags.some(
								(tag) =>
									tag.name.toLowerCase() ===
									query.toLowerCase()
							) && (
								<button
									onClick={() => handleNewTag(query)}
									className='btn-primary w-full'>
									Create {query}{' '}
								</button>
							)}
					</Combobox.Options>
				</div>
			)}
		</Combobox>
	)
}

export default TagPicker
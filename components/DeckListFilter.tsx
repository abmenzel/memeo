import { Listbox } from '@headlessui/react'
import { Filter } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/app'
import ITag from '../models/Tag'
import Tag from './Tag'

const DeckListFilter = () => {
	const { state, actions } = useContext(AppContext)
	const [selectedTag, setSelectedTag] = useState<ITag | null>(null)

	useEffect(() => {
		actions.setActiveTag(selectedTag)
	}, [selectedTag])

	return (
		<Listbox value={selectedTag} onChange={setSelectedTag}>
			<div className='relative flex flex-col items-center'>
				<Listbox.Button className='flex text-xs gap-x-2 btn-secondary items-center'>
					<Filter size={'0.9rem'} />{' '}
					{selectedTag ? (
						<Tag tag={selectedTag} />
					) : (
						<p className='btn-tag bg-orange-175'>All</p>
					)}
				</Listbox.Button>
				<Listbox.Options className='border border-black text-center items-center absolute top-9 bg-orange-100 rounded-md p-2 px-6 flex flex-col gap-2'>
					<Listbox.Option
						key={'all'}
						value={null}
						className=' cursor-pointer w-full flex justify-center'>
						<p className='text-xs bg-orange-175 btn-tag'>All</p>
					</Listbox.Option>
					{state.tags.map((tag) => (
						<Listbox.Option
							key={tag.id}
							value={tag}
							className='cursor-pointer w-full flex justify-center'>
							<Tag tag={tag} className='text-xs' />
						</Listbox.Option>
					))}
				</Listbox.Options>
			</div>
		</Listbox>
	)
}

export default DeckListFilter

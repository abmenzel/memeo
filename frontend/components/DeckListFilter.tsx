import clsx from 'clsx'
import { Filter } from 'lucide-react'
import { useContext } from 'react'
import { AppContext } from '../context/app'
import ITag from '../models/Tag'
import Tag from './Tag'
import { Button } from './ui'

const DeckListFilter = () => {
	const { state, actions } = useContext(AppContext)
	const { activeTag: selectedTag } = state

	const { showModal } = actions

	return (
		<Button
			onClick={() =>
				showModal({
					title: 'Filter by tag',
					component: <TagFilter />,
				})
			}
			className='flex text-xs gap-x-2 btn-secondary items-center'>
			<Filter size={'0.9rem'} />{' '}
			{selectedTag ? (
				<Tag tag={selectedTag} />
			) : (
				<p className='btn-tag bg-orange-175'>All</p>
			)}
		</Button>
	)
}

const TagFilter = () => {
	const { state, actions } = useContext(AppContext)

	return (
		<div className={clsx('flex', 'gap-2', 'flex-wrap')}>
			<>
				<p
					onClick={() => {
						actions.setActiveTag(null)
						actions.hideModal()
					}}
					className={clsx(
						'btn-tag',
						'px-2',
						'py-1.5',
						'rounded-md',
						'bg-orange-175',
						'border',
						{
							'border-transparent': state.activeTag,
						},
						{
							'border-theme-dark': state.activeTag === null,
						}
					)}>
					All
				</p>
				{state.tags.map((tag, index) => {
					const isSelected =
						state.activeTag && state.activeTag.id === tag.id
					return (
						<Tag
							onClick={() => {
								actions.setActiveTag(
									isSelected ? null : tag
								)
								actions.hideModal()
							}}
							tag={tag}
							key={index}
							className={clsx(
								'px-2',
								'py-1.5',
								'rounded-md',
								'border',
								{ 'border-transparent': !isSelected },
								{
									'border-theme-dark': isSelected,
								}
							)}
						/>
					)
				})}
			</>
		</div>
	)
}

export default DeckListFilter

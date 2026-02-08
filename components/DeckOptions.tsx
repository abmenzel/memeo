import { Edit3, Tag, Trash2 } from 'lucide-react'
import { useContext } from 'react'
import { AppContext } from '../context/app'
import Deck from '../models/Deck'
import DeckRename from './DeckRename'
import TagPicker from './TagPicker'
import { Button } from './ui'

const DeckOptions = (props: { deck: Deck }) => {
	const { actions } = useContext(AppContext)
	const { showModal } = actions
	const { deck } = props

	const handleDelete = () => {
		actions.deleteDeck(deck)
	}

	return (
		<div className='flex gap-1'>
			<Button
				animateScale={false}
				rounded={false}
				onClick={(event) =>
					showModal({
						title: `Delete ${deck.name}?`,
						icon: <Trash2 size={'1rem'} />,
						description:
							'This will permanently delete this card deck.',
						onConfirm: () => handleDelete(),
					})
				}>
				<Trash2 size={'1rem'} /> Delete
			</Button>
			<Button
				rounded={false}
				animateScale={false}
				onClick={() =>
					showModal({
						title: 'Rename',
						component: <DeckRename deck={deck} />,
					})
				}>
				<Edit3 size={'1rem'} /> Rename
			</Button>
			<Button
				rounded={false}
				animateScale={false}
				onClick={() =>
					showModal({
						title: `Tag ${deck.name}`,
						component: <TagPicker deck={deck} className='mb-2' />,
					})
				}>
				<Tag size={'1rem'} /> Tag
			</Button>
		</div>
	)
}

export default DeckOptions

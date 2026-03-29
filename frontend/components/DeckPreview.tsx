import { motion } from 'framer-motion'
import { GripVertical, MoreVertical } from 'lucide-react'
import React, { useContext, useMemo } from 'react'
import { AppContext } from '../context/app'
import Deck from '../models/Deck'
import DeckOptions from './DeckOptions'
import Stars from './Stars'
import Tag from './Tag'
import { Button } from './ui'

type DeckPreviewProps = {
	deck: Deck
	handleProps: any
}

const DeckPreview = (props: DeckPreviewProps) => {
	const { deck } = props
	const { actions } = useContext(AppContext)
	const { showModal } = actions

	const handlePick = (event: React.MouseEvent) => {
		actions.pickDeck(deck)
	}

	const averageRating = useMemo(() => {
		const sumOfRatings = deck.cards.reduce((acc, card) => acc + card.rating, 0)
		return sumOfRatings / deck.cards.length
	}, [deck.cards])

	return (
		<motion.div
			initial={{
				backgroundColor: 'rgb(248, 230, 205)',
			}}
			whileHover={{
				backgroundColor: 'rgb(236, 218, 194)',
			}}
			whileTap={{
				backgroundColor: 'rgb(236, 218, 194)',
				transition: {
					duration: 0,
				},
			}}
			onClick={handlePick}
			className='animate-moveUpSlight no-highlight cursor-pointer group mb-2 rounded-md text-sm transition-all px-3 py-4 flex justify-between items-center gap-x-8 w-full'>
			<div className='flex flex-col min-w-0'>
				{deck.tags.map((tag) => <Tag className='text-[10px]' tag={tag} />)}
				<p
					className={`font-serif font-extrabold min-w-0 text-sm md:text-lg flex bg-transparent outline-none text-ellipsis`}>
					{deck.name ? deck.name : 'New deck'}
				</p>
				<p className='text-[11px]'>{deck.cards.length} cards</p>
			</div>
			<div className='flex items-center gap-x-1'>
				<Stars rating={averageRating ?? 0} />
				<div className='flex items-cener gap-0'>
					<Button
						onClick={(event: React.MouseEvent) => {
							event.stopPropagation()
							showModal({
								title: 'Options',
								component: <DeckOptions deck={deck} />,
							})
						}}>
						<MoreVertical size={'1rem'} />
					</Button>
					<Button {...props.handleProps}>
						<GripVertical size='1rem' />
					</Button>
				</div>
			</div>
		</motion.div>
	)
}

export default DeckPreview

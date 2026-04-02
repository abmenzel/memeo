import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Head from 'next/head'
import Link from 'next/link'
import {
	ForwardedRef,
	forwardRef,
	useContext,
	useEffect,
	useState,
} from 'react'
import CardCarousel from '../components/CardCarousel'
import Tag from '../components/Tag'
import PageTransition from '../components/animations/PageTransition'
import { Button } from '../components/ui'
import { AppContext } from '../context/app'
import Deck from '../models/Deck'

type DojoPageRef = ForwardedRef<HTMLDivElement>

const Dojo = forwardRef((props, ref: DojoPageRef) => {
	const { state } = useContext(AppContext)

	const [activeDeck, setActiveDeck] = useState<undefined | Deck>()

	useEffect(() => {
		setActiveDeck(
			state.decks.find((deck) => deck.id === state.activeDeckId),
		)
	}, [state.decks])

	return (
		<>
			<Head>
				<title>Memeo | Dojo</title>
				<meta name='description' content='Memeo' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<PageTransition ref={ref}>
				<div className='w-full h-full flex flex-col'>
					<AnimatePresence>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className='text-center relative pt-4 flex items-center justify-center'>
							<Link href='/dashboard'>
								<Button className='absolute left-0'>
									<ArrowLeft />
								</Button>
							</Link>
							<div className='flex flex-col items-center'>
								{activeDeck?.tags.map((tag) => (
									<Tag className='text-[11px]' tag={tag} />
								))}
								<h2 className='font-serif text-xl font-bold'>
									{activeDeck?.name}
								</h2>
							</div>
						</motion.div>
					</AnimatePresence>

					{activeDeck && <CardCarousel deck={activeDeck} />}
				</div>
			</PageTransition>
		</>
	)
})

export default Dojo

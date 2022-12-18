import { ArrowLeft } from 'lucide-react'
import Head from 'next/head'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import CardCarousel from '../components/CardCarousel'
import Layout from '../components/Layout'
import Tag from '../components/Tag'
import { AppContext } from '../context/app'
import Deck from '../models/Deck'

const Dojo = () => {
	const { state } = useContext(AppContext)

	const [activeDeck, setActiveDeck] = useState<undefined | Deck>()

	useEffect(() => {
		setActiveDeck(
			state.decks.find((deck) => deck.id === state.activeDeckId)
		)
	}, [state.decks])

	return (
		<>
			<Head>
				<title>Memeo | Dojo</title>
				<meta name='description' content='Memeo' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Layout>
				<div className='relative w-full flex-grow flex flex-col'>
					<div className='text-center relative pt-4 flex items-center justify-center'>
						<Link href='/dashboard'>
							<a className='btn-secondary absolute left-0'>
								<ArrowLeft />
							</a>
						</Link>
						<div className='flex flex-col items-center'>
							{activeDeck?.tag && (
								<Tag
									className='text-[11px]'
									tag={activeDeck.tag}
								/>
							)}
							<h2 className='font-serif text-xl font-bold'>
								{activeDeck?.title}
							</h2>
						</div>
					</div>
					{activeDeck && <CardCarousel deck={activeDeck} />}
				</div>
			</Layout>
		</>
	)
}

export default Dojo

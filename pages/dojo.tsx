import { ArrowLeft } from 'lucide-react'
import Head from 'next/head'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import CardCarousel from '../components/CardCarousel'
import Layout from '../components/Layout'
import ToggleFlip from '../components/ToggleFlip'
import { AppContext } from '../context/app'
import { testDeck1 } from '../test/data/testDecks'

const Dojo = () => {
	const { state } = useContext(AppContext)

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
						<div className='flex flex-col'>
							<h2 className='font-serif text-xl font-bold'>
								{state.activeDeck?.title}
							</h2>
						</div>
						<div className='absolute right-0'>
							<ToggleFlip />
						</div>
					</div>
					<CardCarousel />
				</div>
			</Layout>
		</>
	)
}

export default Dojo

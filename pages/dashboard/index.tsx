import { NextPage } from 'next'
import Head from 'next/head'
import { useContext } from 'react'
import DeckList from '../../components/DeckList'
import DeckListFilter from '../../components/DeckListFilter'
import Layout from '../../components/Layout'
import { AppContext } from '../../context/app'

const Dashboard: NextPage = () => {
	const { state } = useContext(AppContext)

	return (
		<>
			<Head>
				<title>Memeo - Simple Flashcards</title>
				<meta name='description' content='Memeo' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Layout>
				<div className='w-full relative'>
					<div className='fixed top-0 left-0 right-0 z-20 w-full text-center flex flex-col items-center pt-4 h-28'>
						{state.user && (
							<p className='text-xs mb-1'>{state.user.name}'s</p>
						)}
						<h1 className='text-3xl mb-0 font-serif font-extrabold'>
							Card Decks
						</h1>
						{state.tags.length > 0 && <DeckListFilter />}
					</div>
					<div className='pointer-events-none bg-gradient-to-b from-orange-100 via-orange-100 fixed z-10 inset-x-0 top-0 h-32' />
					<div className='pointer-events-none bg-gradient-to-t from-orange-100  fixed z-10 inset-x-0 bottom-14 h-20' />
					<DeckList className='pt-28 pb-10' />
				</div>
			</Layout>
		</>
	)
}

export default Dashboard

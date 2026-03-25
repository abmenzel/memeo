import { AnimatePresence } from 'framer-motion'
import { NextPage } from 'next'
import Head from 'next/head'
import { ForwardedRef, forwardRef, useContext } from 'react'
import DeckList from '../../components/DeckList'
import DeckListFilter from '../../components/DeckListFilter'
import LoadingScreen from '../../components/LoadingScreen'
import PageTransition from '../../components/animations/PageTransition'
import { AppContext } from '../../context/app'

type DashboardPageRef = ForwardedRef<HTMLDivElement>

const Dashboard: NextPage = forwardRef((props, ref: DashboardPageRef) => {
	const { state } = useContext(AppContext)
	const isLoading = state.userLoading || state.decksLoading
	return (
		<>
			<Head>
				<title>Memeo - Simple Flashcards</title>
				<meta name='description' content='Memeo' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<PageTransition ref={ref}>
				<AnimatePresence initial={false} mode='popLayout'>
					{isLoading && <LoadingScreen />}
				</AnimatePresence>
				{!isLoading && (
					<div className='w-full h-full flex flex-col relative'>
						<div className='absolute top-0 left-0 right-0 z-20 w-full text-center flex flex-col items-center pt-4 h-28'>
							{state.user && (
								<p className='text-xs mb-1'>
									{state.user.email_address}'s
								</p>
							)}
							<h1 className='text-3xl mb-0 font-serif font-extrabold'>
								Card Decks
							</h1>
							{state.tags.length > 0 && <DeckListFilter />}
						</div>
						<div className='pointer-events-none bg-gradient-to-b from-orange-100 via-orange-100 absolute z-10 inset-x-0 top-0 h-32' />
						<div className='pointer-events-none bg-gradient-to-t from-orange-100  absolute z-10 inset-x-0 bottom-0 h-20' />
						<DeckList className='h-full flex-grow pt-28 pb-10' />
					</div>
				)}
			</PageTransition>
		</>
	)
})

export default Dashboard

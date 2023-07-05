import { AnimatePresence } from 'framer-motion'
import type { NextPage } from 'next'
import Head from 'next/head'
import { ForwardedRef, forwardRef, useContext } from 'react'
import LoadingScreen from '../components/LoadingScreen'
import SignInCard from '../components/SignInCard'
import PageTransition from '../components/animations/PageTransition'
import { AppContext } from '../context/app'

type LoginPageRef = ForwardedRef<HTMLDivElement>

const Login: NextPage = forwardRef((props, ref: LoginPageRef) => {
	const { state } = useContext(AppContext)

	const isLoading = state.userLoading

	return (
		<>
			<Head>
				<title>Memeo - Simple Flashcards</title>
				<meta name='description' content='Memeo' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<PageTransition ref={ref}>
				<AnimatePresence initial={false} mode='popLayout'>
					{isLoading || (!state.user && <LoadingScreen />)}
				</AnimatePresence>
				{!isLoading && !state.user && (
					<div className='mb-8 mx-auto text-center max-w-sm h-full flex flex-col justify-center items-center gap-2'>
						<h1 className='font-extrabold text-3xl mb-0 font-serif'>
							Login
						</h1>
						<p className='text-lg mb-4'>
							Sign in with your Google account and start building
							your card decks.
						</p>
						<SignInCard />
					</div>
				)}
			</PageTransition>
		</>
	)
})

export default Login

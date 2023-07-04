import type { NextPage } from 'next'
import Head from 'next/head'
import { ForwardedRef, forwardRef } from 'react'
import SignInCard from '../components/SignInCard'
import PageTransition from '../components/animations/PageTransition'

type LoginPageRef = ForwardedRef<HTMLDivElement>

const Login: NextPage = forwardRef((props, ref: LoginPageRef) => {
	return (
		<>
			<Head>
				<title>Memeo - Simple Flashcards</title>
				<meta name='description' content='Memeo' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<PageTransition ref={ref}>
				<div className='mb-8 mx-auto text-center max-w-sm h-full flex flex-col justify-center items-center gap-2'>
					<h1 className='font-extrabold text-3xl mb-0 font-serif'>
						Login
					</h1>
					<p className='text-lg mb-4'>
						Sign in with your Google account and start building your
						card decks.
					</p>
					<SignInCard />
				</div>
			</PageTransition>
		</>
	)
})

export default Login

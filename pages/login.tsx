import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout'
import SignInCard from '../components/SignInCard'

const Login: NextPage = () => {
	return (
		<>
			<Head>
				<title>Memeo - Simple Flashcards</title>
				<meta name='description' content='Memeo' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Layout hideNavBar={true}>
				<div className='mb-8 text-center max-w-sm h-full flex flex-col justify-center items-center gap-2'>
					<h1 className='font-extrabold text-3xl mb-0 font-serif'>
						Login
					</h1>
					<p className='text-lg mb-4'>
						Sign in with your Google account and start building your
						card decks.
					</p>
					<SignInCard />
				</div>
			</Layout>
		</>
	)
}

export default Login

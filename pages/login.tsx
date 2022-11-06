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
				<div className='mb-8 text-center max-w-sm'>
					<h1 className='font-extrabold text-3xl mb-4 font-serif'>
						Login
					</h1>
					<p className='text-lg'>
						Sign in with your Google account and start building your
						card decks.
					</p>
				</div>
				<SignInCard />
			</Layout>
		</>
	)
}

export default Login

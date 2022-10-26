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
				<h1 className='font-bold text-3xl mb-4'>Login</h1>
				<SignInCard />
			</Layout>
		</>
	)
}

export default Login

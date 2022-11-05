import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout'
import Link from 'next/link'
import { LogIn } from 'lucide-react'
import { useContext } from 'react'
import { AppContext } from '../context/app'
import { Types } from '../reducers/reducers'
import SignInCard from '../components/SignInCard'

const Home: NextPage = () => {
	const { state, dispatch } = useContext(AppContext)
	return (
		<>
			<Head>
				<title>Memeo - Simple Flashcards</title>
				<meta name='description' content='Memeo' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Layout hideNavBar={true}>
				<h1 className='font-bold text-3xl mb-4'>Welcome</h1>
				<Link href={'/login'}>
					<a className='btn-primary flex items-center gap-x-2'>
						<LogIn /> Login
					</a>
				</Link>
			</Layout>
		</>
	)
}

export default Home

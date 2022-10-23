import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import Link from 'next/link'
import { LogIn } from 'lucide-react'

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Memeo - Simple Flashcards</title>
				<meta name='description' content='Memeo' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Layout hideNavBar={true}>
				<h1 className='font-bold text-3xl mb-4'>Welcome</h1>
				<Link href='/dojo'>
					<a className='btn-primary flex items-center gap-x-2'>
						<LogIn /> Login
					</a>
				</Link>
			</Layout>
		</>
	)
}

export default Home

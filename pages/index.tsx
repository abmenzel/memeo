import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout'
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
				<div className='text-center max-w-xs mb-12'>
					<h1 className='font-extrabold text-3xl font-serif mb-4'>
						Memeo
					</h1>
					<p className='text-lg'>
						Become a master at memorizing anything you would like.
					</p>
				</div>

				<Link href={'/login'}>
					<a className='btn-primary'>
						<LogIn /> Get started
					</a>
				</Link>
			</Layout>
		</>
	)
}

export default Home

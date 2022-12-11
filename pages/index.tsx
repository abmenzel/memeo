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
				<div className='h-full flex flex-col items-center justify-center text-center max-w-xs mb-12 gap-2'>
					<h1 className='font-extrabold text-3xl font-serif mb-0'>
						Memeo
					</h1>
					<p className='text-lg mb-4'>
						Become a master at memorizing anything you would like.
					</p>
					<Link href={'/login'}>
						<a className='btn-primary'>
							<LogIn /> Get started
						</a>
					</Link>
				</div>
			</Layout>
		</>
	)
}

export default Home

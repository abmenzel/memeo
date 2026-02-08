import { LogIn } from 'lucide-react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { ForwardedRef, forwardRef } from 'react'
import PageTransition from '../components/animations/PageTransition'
import { Button } from '../components/ui'
import { useRouter } from 'next/router'

type HomePageRef = ForwardedRef<HTMLDivElement>

const Home: NextPage = forwardRef((props, ref: HomePageRef) => {
	const router = useRouter()
	return (
		<>
			<Head>
				<title>Memeo - Simple Flashcards</title>
				<meta name='description' content='Memeo' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<PageTransition ref={ref}>
				<div className='h-full mx-auto flex flex-col items-center justify-center text-center max-w-xs mb-12 gap-2'>
					<h1 className='font-extrabold text-3xl font-serif mb-0'>
						Memeo
					</h1>
					<p className='text-lg mb-4'>
						Become a master at memorizing anything you would like.
					</p>
					<Button
						variant='primary'
						onClick={() => {
							router.push('/login')
						}}>
						Get started
					</Button>
				</div>
			</PageTransition>
		</>
	)
})

export default Home

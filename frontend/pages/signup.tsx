import { AnimatePresence } from 'framer-motion'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { FormEvent, ForwardedRef, forwardRef, useContext, useState } from 'react'
import LoadingScreen from '../components/LoadingScreen'
import PageTransition from '../components/animations/PageTransition'
import { AppContext } from '../context/app'
import { toast } from '../context/ToastContext'
import { Button } from '../components/ui'
import { createUser } from '../lib/api/users'

type SignupPageRef = ForwardedRef<HTMLDivElement>

const Signup: NextPage = forwardRef((props, ref: SignupPageRef) => {
	const { state, actions } = useContext(AppContext)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const isLoading = state.userLoading

	const handleSignup = async (event: FormEvent) => {
		event.preventDefault()
		const res = await createUser({
			email_address: email,
			password: password
		})

		if(!res.ok){
			toast({ message: 'Signup failed', type: 'error' })
			return
		}

		localStorage.setItem('token', res.data.token)

		actions.signIn({
			email_address: res.data.user.email_address,
			id: res.data.user.id,
		})
	}

	return (
		<>
			<Head>
				<title>Memeo - Sign Up</title>
				<meta name='description' content='Memeo' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<PageTransition ref={ref}>
				<AnimatePresence initial={false} mode='popLayout'>
					{isLoading && <LoadingScreen />}
				</AnimatePresence>
				{!isLoading && !state.user && (
					<form onSubmit={handleSignup} className='mb-8 mx-auto text-center max-w-sm h-full flex flex-col justify-center items-center gap-2'>
						<h1 className='font-extrabold text-3xl mb-0 font-serif'>
							Sign Up
						</h1>
						<div className='flex flex-col gap-2 my-4'>
							<input
								onInput={(event) => {
									if (
										!(
											event.target instanceof
											HTMLInputElement
										)
									)
										return
									const value = event.target.value
									setEmail(value)
								}}
								className='bg-black bg-opacity-[0.05] p-2 px-2.5 placeholder-theme-dark rounded-md focus-visible:outline-theme-dark outline-offset-4'
								type='email'
								name='email'
								placeholder='E-mail'
							/>
							<input
								onInput={(event) => {
									if (
										!(
											event.target instanceof
											HTMLInputElement
										)
									)
										return
									const value = event.target.value
									setPassword(value)
								}}
								className='bg-black bg-opacity-[0.05] p-2 px-2.5 placeholder-theme-dark rounded-md focus-visible:outline-theme-dark outline-offset-4'
								type='password'
								name='password'
								placeholder='Password'
							/>
						</div>
						<Button variant='primary'>
							Sign Up
						</Button>
						<p className='text-sm mt-2 absolute bottom-4'>
							Have an account?{" "}
							<Link href='/login' className='underline'>
								Log in
							</Link>
						</p>
					</form>
				)}
			</PageTransition>
		</>
	)
})

export default Signup

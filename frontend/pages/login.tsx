import { AnimatePresence } from 'framer-motion'
import type { NextPage } from 'next'
import Head from 'next/head'
import { FormEvent, ForwardedRef, forwardRef, useContext, useState } from 'react'
import LoadingScreen from '../components/LoadingScreen'
import PageTransition from '../components/animations/PageTransition'
import { AppContext } from '../context/app'
import { Button } from '../components/ui'
import { createSession } from '../lib/api/sessions'

type LoginPageRef = ForwardedRef<HTMLDivElement>

const Login: NextPage = forwardRef((props, ref: LoginPageRef) => {
	const { state, actions } = useContext(AppContext)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const isLoading = state.userLoading

	const handleLogin = async (event: FormEvent) => {
		event.preventDefault()
		const res = await createSession({
			email_address: email,
			password: password
		})

		if(!res.ok){
			console.error(res.error)
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
				<title>Memeo - Simple Flashcards</title>
				<meta name='description' content='Memeo' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<PageTransition ref={ref}>
				<AnimatePresence initial={false} mode='popLayout'>
					{isLoading && <LoadingScreen />}
				</AnimatePresence>
				{!isLoading && !state.user && (
					<form onSubmit={handleLogin} className='mb-8 mx-auto text-center max-w-sm h-full flex flex-col justify-center items-center gap-2'>
						<h1 className='font-extrabold text-3xl mb-0 font-serif'>
							Login
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
							Continue
						</Button>
					</form>
				)}
			</PageTransition>
		</>
	)
})

export default Login

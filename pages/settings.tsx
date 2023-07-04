import Head from 'next/head'
import { ForwardedRef, forwardRef, useContext } from 'react'
import ToggleFlip from '../components/ToggleFlip'
import PageTransition from '../components/animations/PageTransition'
import { AppContext } from '../context/app'

type SettingsPageRef = ForwardedRef<HTMLDivElement>

const Settings = forwardRef((props, ref: SettingsPageRef) => {
	const { state } = useContext(AppContext)

	return (
		<>
			<Head>
				<title>Memeo | Settings</title>
				<meta name='description' content='Memeo' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<PageTransition ref={ref}>
				<div className='relative w-full flex-grow flex items-center flex-col py-6'>
					<h1 className='text-3xl mb-4 font-serif font-extrabold'>
						Settings
					</h1>
					<div className='w-full'>
						<div className='flex gap-6 justify-between'>
							<p>Default card side</p>
							<ToggleFlip />
						</div>
					</div>
				</div>
			</PageTransition>
		</>
	)
})

export default Settings

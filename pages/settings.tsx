import Head from 'next/head'
import { useContext } from 'react'
import Layout from '../components/Layout'
import ToggleFlip from '../components/ToggleFlip'
import { AppContext } from '../context/app'

const Settings = () => {
	const { state } = useContext(AppContext)

	return (
		<>
			<Head>
				<title>Memeo | Settings</title>
				<meta name='description' content='Memeo' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Layout>
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
			</Layout>
		</>
	)
}

export default Settings

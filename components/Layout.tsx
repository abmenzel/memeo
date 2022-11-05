import Head from 'next/head'
import React, { ReactNode } from 'react'
import Navbar from './Navbar'

const Layout = ({
	children,
	hideNavBar,
}: {
	children: ReactNode
	hideNavBar?: boolean
}) => {
	return (
		<>
			<Head>
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link rel='preconnect' href='https://fonts.gstatic.com' />
				<link
					href='https://fonts.googleapis.com/css2?family=Nunito+Sans&family=Nunito:wght@400;700;800&display=swap'
					rel='stylesheet'
				/>
			</Head>
			<div className='font-body overflow-y-auto bg-orange-100 text-black h-screen flex flex-col items-center'>
				<div className='max-w-xl w-full flex flex-col justify-center items-center grow px-4'>
					{children}
				</div>
				{!hideNavBar && <Navbar />}
			</div>
		</>
	)
}

export default Layout

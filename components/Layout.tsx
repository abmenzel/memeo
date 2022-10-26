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
		<div className='bg-orange-100 text-black min-h-screen flex flex-col'>
			<div className='flex flex-col justify-center items-center grow px-4'>
				{children}
			</div>
			{!hideNavBar && <Navbar />}
		</div>
	)
}

export default Layout

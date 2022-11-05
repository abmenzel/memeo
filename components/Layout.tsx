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
		<div className='overflow-y-auto bg-orange-100 text-black h-screen flex flex-col items-center'>
			<div className='max-w-xl w-full flex flex-col justify-center items-center grow px-4'>
				{children}
			</div>
			{!hideNavBar && <Navbar />}
		</div>
	)
}

export default Layout

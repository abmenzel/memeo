import React, { ReactNode } from 'react'
import Cookies from './Cookies'
import Navbar from './Navbar'

const Layout = ({
	children,
	hideNavBar,
}: {
	children: ReactNode
	hideNavBar?: boolean
}) => {
	return (
		<div className='font-body bg-orange-100 text-black height-actual-screen flex flex-col items-center justify-between'>
			<Cookies />
			<div className='overflow-y-auto scrollbar-none max-w-xl w-full flex flex-col items-center px-4 flex-grow'>
				{children}
			</div>
			{!hideNavBar && <Navbar />}
		</div>
	)
}

export default Layout

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
		<div className='font-body bg-orange-100 text-black height-actual-screen flex flex-col justify-between'>
			<Cookies />
			<div className='max-w-xl overflow-y-auto w-full flex flex-col justify-center items-center px-4 flex-grow'>
				{children}
			</div>
			{!hideNavBar && <Navbar />}
		</div>
	)
}

export default Layout

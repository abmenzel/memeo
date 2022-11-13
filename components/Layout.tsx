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
		<div className='font-body overflow-y-auto bg-orange-100 text-black height-actual-screen flex flex-col items-center'>
			<Cookies />
			<div className='max-w-xl w-full flex flex-col justify-center items-center grow px-4'>
				{children}
			</div>
			{!hideNavBar && <Navbar />}
		</div>
	)
}

export default Layout

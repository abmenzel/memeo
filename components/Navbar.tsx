import { LayoutGrid, Settings } from 'lucide-react'
import React from 'react'
import NavItem from './NavItem'

const Navbar = () => {
	return (
		<div className='flex justify-center py-1'>
			<nav className='max-w-lg w-full'>
				<ul className='w-full flex justify-center gap-x-2'>
					<NavItem
						active={true}
						icon={<LayoutGrid />}
						label='Cards'
					/>
					<NavItem icon={<Settings />} label='Settings' />
				</ul>
			</nav>
		</div>
	)
}

export default Navbar

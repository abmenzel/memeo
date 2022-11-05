import { LayoutGrid, Settings } from 'lucide-react'
import React from 'react'
import NavItem from './NavItem'

const Navbar = () => {
	return (
		<div className='w-full flex justify-center'>
			<nav className='mx-8 py-2 border-t border-black border-opacity-10 max-w-lg w-full'>
				<ul className='w-full flex justify-center gap-x-2'>
					<NavItem
						route='/dashboard'
						active={true}
						icon={<LayoutGrid />}
						label='Cards'
					/>
					<NavItem
						route='/settings'
						icon={<Settings />}
						label='Settings'
					/>
				</ul>
			</nav>
		</div>
	)
}

export default Navbar

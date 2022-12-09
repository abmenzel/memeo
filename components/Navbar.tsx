import { LayoutGrid, LogOut, Settings, Settings2 } from 'lucide-react'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { AppContext } from '../context/app'
import { supabase } from '../lib/api'
import { Types } from '../context/reducers'
import NavItem from './NavItem'

const Navbar = () => {
	const router = useRouter()
	const { dispatch } = useContext(AppContext)
	return (
		<div className='w-full flex justify-center'>
			<nav className='mx-8 py-2 border-t border-black border-opacity-10 max-w-lg w-full'>
				<ul className='w-full flex justify-center gap-x-2'>
					<NavItem
						route='/dashboard'
						callback={() => router.push('/dashboard')}
						icon={<LayoutGrid />}
						label='Cards'
					/>
					<NavItem
						route='/settings'
						callback={() => router.push('/settings')}
						icon={<Settings />}
						label='Settings'
					/>
					<NavItem
						icon={<LogOut />}
						callback={async () => {
							const { error } = await supabase.auth.signOut()
							dispatch({
								type: Types.SignOut,
								payload: null,
							})
							router.push('/login')
						}}
						label='Sign out'
					/>
				</ul>
			</nav>
		</div>
	)
}

export default Navbar

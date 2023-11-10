import { motion } from 'framer-motion'
import { LayoutGrid, LogOut, Settings } from 'lucide-react'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { AppContext } from '../context/app'
import { supabase } from '../lib/api'
import NavItem from './NavItem'

const Navbar = () => {
	const router = useRouter()
	const { actions } = useContext(AppContext)
	return (
		<motion.div
			animate={{ y: 0 }}
			transition={{
				ease: 'easeInOut',
			}}
			exit={{
				y: '100%',
			}}
			initial={{
				y: '100%',
			}}
			className='w-full bg-orange-100 flex justify-center items-center shrink-0 relative z-30'>
			<nav className='border-t border-black h-16 flex items-center border-opacity-10 max-w-lg w-full'>
				<ul className='w-full flex justify-center gap-x-2 whitespace-nowrap overflow-hidden'>
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
							actions.signOut()
						}}
						label='Sign out'
					/>
				</ul>
			</nav>
		</motion.div>
	)
}

export default Navbar

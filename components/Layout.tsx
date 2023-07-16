import { AnimatePresence } from 'framer-motion'
import { ReactNode, useContext } from 'react'
import { AppContext } from '../context/app'
import Cookies from './Cookies'
import Modal from './Modal'
import Navbar from './Navbar'

const Layout = ({
	children,
	hideNavBar,
}: {
	children: ReactNode
	hideNavBar?: boolean
}) => {
	const { state, actions } = useContext(AppContext)
	const { hideModal } = actions
	return (
		<div className='font-body bg-orange-100 text-black height-actual-screen flex flex-col items-center justify-between'>
			<Cookies />
			<Modal {...state.modal} onClose={() => hideModal()} />
			<div className='overflow-y-auto scrollbar-none max-w-xl w-full flex flex-col items-center px-4 flex-grow'>
				{children}
			</div>
			<AnimatePresence>{!hideNavBar && <Navbar />}</AnimatePresence>
		</div>
	)
}

export default Layout

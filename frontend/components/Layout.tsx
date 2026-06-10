import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../context/app'
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
	const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
	const [dismissed, setDismissed] = useState(false)
	const installEventFired = useRef(false)

	useEffect(() => {
		const handler = (e: Event) => {
			e.preventDefault()
			if (installEventFired.current) return
			installEventFired.current = true
			setDeferredPrompt(e)
		}
		window.addEventListener('beforeinstallprompt', handler)
		return () => window.removeEventListener('beforeinstallprompt', handler)
	}, [])

	const handleInstall = useCallback(() => {
		if (!deferredPrompt) return
		deferredPrompt.prompt()
		deferredPrompt.userChoice.then(() => {
			setDeferredPrompt(null)
		})
	}, [deferredPrompt])

	const showInstallBanner = deferredPrompt && !dismissed && !hideNavBar

	return (
		<div className='font-body bg-orange-100 text-black height-actual-screen flex flex-col items-center justify-between'>
			<Modal stack={state.modalStack} onClose={() => hideModal()} />
			<div className='overflow-y-auto scrollbar-none max-w-xl w-full flex flex-col items-center px-4 flex-grow'>
				{children}
			</div>
			<AnimatePresence>
				{showInstallBanner && (
					<motion.div
						initial={{ y: 40, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 40, opacity: 0 }}
						className='w-full bg-theme-dark text-orange-100 px-4 py-2.5 flex items-center justify-between gap-2 max-w-lg mx-auto rounded-t-xl'>
						<p className='text-xs font-medium'>Install Memeo for the best experience</p>
						<div className='flex gap-2 shrink-0'>
							<button
								onClick={() => setDismissed(true)}
								className='text-xs text-orange-100 text-opacity-70 px-2 py-1'>
								Not now
							</button>
							<button
								onClick={handleInstall}
								className='text-xs font-bold bg-orange-100 text-theme-dark px-3 py-1 rounded-md'>
								Install
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
			<AnimatePresence>{!hideNavBar && <Navbar />}</AnimatePresence>
		</div>
	)
}

export default Layout

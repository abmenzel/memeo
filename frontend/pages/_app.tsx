import { AnimatePresence } from 'framer-motion'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import { AppProvider } from '../context/app'
import { ToastProvider } from '../context/ToastContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter()
	const pageKey = router.asPath

	const hideNavBar = pageKey === '/' || pageKey === '/login'

	return (
		<AppProvider>
			<ToastProvider>
				<Layout hideNavBar={hideNavBar}>
					<AnimatePresence initial={false} mode='popLayout'>
						<Component {...pageProps} key={pageKey} />
					</AnimatePresence>
				</Layout>
			</ToastProvider>
		</AppProvider>
	)
}

export default MyApp

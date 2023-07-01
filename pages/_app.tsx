import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import DragDropHandler from '../components/DragDropHandler'
import GoogleAnalytics from '../components/GoogleAnalytics'
import { AppProvider } from '../context/app'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter()
	const pageKey = router.asPath

	return (
		<AppProvider>
			<DragDropHandler>
				<GoogleAnalytics />
				<Component {...pageProps} key={pageKey} />
			</DragDropHandler>
		</AppProvider>
	)
}

export default MyApp

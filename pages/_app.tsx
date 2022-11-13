import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppProvider } from '../context/app'
import GoogleAnalytics from '../components/GoogleAnalytics'
import Cookies from '../components/Cookies'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AppProvider>
			<GoogleAnalytics />
			<Component {...pageProps} />
		</AppProvider>
	)
}

export default MyApp

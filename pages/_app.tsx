import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppProvider } from '../context/app'
import GoogleAnalytics from '../components/GoogleAnalytics'
import DragDropHandler from '../components/DragDropHandler'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AppProvider>
			<DragDropHandler>
				<GoogleAnalytics />
				<Component {...pageProps} />
			</DragDropHandler>
		</AppProvider>
	)
}

export default MyApp

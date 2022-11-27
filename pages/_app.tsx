import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppProvider } from '../context/app'
import GoogleAnalytics from '../components/GoogleAnalytics'
import Cookies from '../components/Cookies'
import { DragDropContext } from 'react-beautiful-dnd'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<DragDropContext onDragEnd={() => {}}>
			<AppProvider>
				<GoogleAnalytics />
				<Component {...pageProps} />
			</AppProvider>
		</DragDropContext>
	)
}

export default MyApp

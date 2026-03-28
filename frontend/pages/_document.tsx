import Document, { Html, Head, Main, NextScript } from 'next/document'

class MemeoDocument extends Document {
	render() {
		return (
			<Html lang='da-DK'>
				<Head>
					<link rel='manifest' href='/manifest.json' />
					<link rel='apple-touch-icon' href='/favicon-192.png'></link>
					<link
						rel='preconnect'
						href='https://fonts.googleapis.com'
					/>
					<link rel='preconnect' href='https://fonts.gstatic.com' />
					<link
						href='https://fonts.googleapis.com/css2?family=Nunito+Sans&family=Nunito:wght@400;700;800&display=swap'
						rel='stylesheet'
					/>
					<meta name='theme-color' content='#ffedd5' />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MemeoDocument

import Document, { Html, Head, Main, NextScript } from 'next/document'

class MemeoDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link rel='manifest' href='/manifest.json' />
					<link rel='apple-touch-icon' href='/favicon-192.png'></link>
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

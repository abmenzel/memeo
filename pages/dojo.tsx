import Head from 'next/head'
import React from 'react'
import CardCarousel from '../components/CardCarousel/CardCarousel'
import Layout from '../components/Layout/Layout'
import testDeck1 from '../test/data/testCards'

const Dojo = () => {
	return (
		<>
			<Head>
				<title>Memeo | Dojo</title>
				<meta name='description' content='Memeo' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Layout>
				<CardCarousel cards={testDeck1} />
			</Layout>
		</>
	)
}

export default Dojo

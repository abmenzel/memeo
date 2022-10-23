import Head from 'next/head'
import React, { useState } from 'react'
import CardCarousel from '../components/CardCarousel/CardCarousel'
import Layout from '../components/Layout/Layout'
import testDeck1 from '../test/data/testCards'

const Dojo = () => {
	const [cards, setCards] = useState(testDeck1)

	return (
		<>
			<Head>
				<title>Memeo | Dojo</title>
				<meta name='description' content='Memeo' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Layout>
				<CardCarousel cards={cards} setCards={setCards} />
			</Layout>
		</>
	)
}

export default Dojo

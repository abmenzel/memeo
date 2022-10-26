import Head from 'next/head'
import React, { useState } from 'react'
import CardCarousel from '../components/CardCarousel'
import Layout from '../components/Layout'
import { testDeck1 } from '../test/data/testDecks'

const Dojo = () => {
	const [cards, setCards] = useState(testDeck1.cards)

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

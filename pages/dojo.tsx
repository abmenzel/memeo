import Head from 'next/head'
import React, { useContext, useState } from 'react'
import CardCarousel from '../components/CardCarousel'
import Layout from '../components/Layout'
import { AppContext } from '../context/app'
import { testDeck1 } from '../test/data/testDecks'

const Dojo = () => {
	const { state } = useContext(AppContext)
	const [cards, setCards] = useState(
		state.activeDeck ? state.activeDeck.cards : []
	)

	console.log('test', state)

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

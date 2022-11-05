import Head from 'next/head'
import React, { useContext, useState } from 'react'
import CardCarousel from '../components/CardCarousel'
import Layout from '../components/Layout'
import { AppContext } from '../context/app'
import { testDeck1 } from '../test/data/testDecks'

const Dojo = () => {
	const { state } = useContext(AppContext)

	return (
		<>
			<Head>
				<title>Memeo | Dojo</title>
				<meta name='description' content='Memeo' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Layout>
				<CardCarousel />
			</Layout>
		</>
	)
}

export default Dojo

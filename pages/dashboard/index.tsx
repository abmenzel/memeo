import { NextPage } from 'next'
import Head from 'next/head'
import React, { useContext } from 'react'
import DeckList from '../../components/DeckList'
import Layout from '../../components/Layout'
import SignOutButton from '../../components/SignOutButton'
import { AppContext } from '../../context/app'

const Dashboard: NextPage = () => {
	const { state, dispatch } = useContext(AppContext)

	return (
		<>
			<Head>
				<title>Memeo - Simple Flashcards</title>
				<meta name='description' content='Memeo' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Layout>
				<h1 className='text-3xl mb-4 font-serif font-extrabold'>
					Card Decks
				</h1>
				<DeckList />
				<SignOutButton />
			</Layout>
		</>
	)
}

export default Dashboard

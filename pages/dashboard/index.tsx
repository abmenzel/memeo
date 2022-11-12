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
				{state.user && (
					<p className='text-xs mb-1'>{state.user.name}'s</p>
				)}
				<h1 className='text-3xl mb-0 font-serif font-extrabold'>
					Card Decks
				</h1>
				<DeckList />
			</Layout>
		</>
	)
}

export default Dashboard

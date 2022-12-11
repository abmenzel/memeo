import { NextPage } from 'next'
import Head from 'next/head'
import React, { useContext } from 'react'
import DeckList from '../../components/DeckList'
import DeckListFilter from '../../components/DeckListFilter'
import Layout from '../../components/Layout'
import SignOutButton from '../../components/SignOutButton'
import TagPicker from '../../components/TagPicker'
import { AppContext } from '../../context/app'

const Dashboard: NextPage = () => {
	const { state } = useContext(AppContext)

	return (
		<>
			<Head>
				<title>Memeo - Simple Flashcards</title>
				<meta name='description' content='Memeo' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Layout>
				<div className='text-center flex flex-col items-center pt-4 mb-4'>
					{state.user && (
						<p className='text-xs mb-1'>{state.user.name}'s</p>
					)}
					<h1 className='text-3xl mb-0 font-serif font-extrabold'>
						Card Decks
					</h1>
					{state.tags.length > 0 && <DeckListFilter />}
				</div>

				<DeckList />
			</Layout>
		</>
	)
}

export default Dashboard

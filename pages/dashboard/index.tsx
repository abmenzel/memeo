import { NextPage } from 'next'
import Head from 'next/head'
import React, { useContext } from 'react'
import Layout from '../../components/Layout'
import { AppContext } from '../../context/app'

const Dashboard: NextPage = () => {
	const { state, dispatch } = useContext(AppContext)
	const { user } = state
	console.log('state', state)
	return (
		<>
			<Head>
				<title>Memeo - Simple Flashcards</title>
				<meta name='description' content='Memeo' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Layout hideNavBar={true}>
				<h1 className='font-bold text-3xl mb-4'>Dashboard</h1>
				<p>{user?.name}</p>
			</Layout>
		</>
	)
}

export default Dashboard

import { Provider } from '@supabase/supabase-js'
import React, { useContext } from 'react'
import { supabase } from '../lib/api'
import { RiGoogleFill } from 'react-icons/ri'

const SignInCard = () => {
	const handleOAuthLogin = async (provider: Provider) => {
		const { error } = await supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
			},
		})
		if (error) console.log('Error: ', error.message)
	}

	return (
		<button
			onClick={() => handleOAuthLogin('google')}
			className='btn-primary'>
			<RiGoogleFill size='1rem' /> Sign in with Google
		</button>
	)
}

export default SignInCard

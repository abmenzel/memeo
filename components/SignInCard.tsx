import { Provider } from '@supabase/supabase-js'
import { LogIn, LogOut } from 'lucide-react'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { AppContext } from '../context/app'
import { supabase } from '../lib/api'
import { Types } from '../reducers/reducers'

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
			className='btn-secondary flex items-center gap-x-2'>
			<LogIn /> Sign in with Google
		</button>
	)
}

export default SignInCard

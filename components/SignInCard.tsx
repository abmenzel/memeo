import { Provider } from '@supabase/supabase-js'
import { LogIn, LogOut } from 'lucide-react'
import React, { useContext } from 'react'
import { AppContext } from '../context/app'
import { supabase } from '../lib/api'
import Database from '../models/Database'
import { Types } from '../reducers/reducers'

const SignInCard = () => {
	const { state, dispatch } = useContext(AppContext)

	const handleOAuthLogin = async (provider: Provider) => {
		const { error } = await supabase.auth.signInWithOAuth({ provider })
		if (error) console.log('Error: ', error.message)
	}

	return (
		<ul>
			{state.user ? (
				<li
					onClick={async () => {
						await supabase.auth.signOut()
						dispatch({
							type: Types.SignOut,
							payload: null,
						})
					}}
					className='btn-primary flex items-center gap-x-2'>
					<LogOut /> Sign out
				</li>
			) : (
				<li
					onClick={() => handleOAuthLogin('google')}
					className='btn-primary flex items-center gap-x-2'>
					<LogIn /> Sign in with Google
				</li>
			)}
		</ul>
	)
}

export default SignInCard

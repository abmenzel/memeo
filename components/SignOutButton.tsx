import { LogOut } from 'lucide-react'
import React, { useContext } from 'react'
import { AppContext } from '../context/app'
import { supabase } from '../lib/api'
import { Types } from '../reducers/reducers'

const SignOutButton = () => {
	const { dispatch } = useContext(AppContext)

	return (
		<button
			onClick={async () => {
				await supabase.auth.signOut()
				dispatch({
					type: Types.SignOut,
					payload: null,
				})
			}}
			className='btn-primary flex items-center gap-x-2'>
			<LogOut /> Sign out
		</button>
	)
}

export default SignOutButton

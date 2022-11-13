import { LogOut } from 'lucide-react'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { AppContext } from '../context/app'
import { supabase } from '../lib/api'
import { Types } from '../reducers/reducers'

const SignOutButton = () => {
	const { dispatch } = useContext(AppContext)
	const router = useRouter()
	return (
		<button
			onClick={async () => {
				const { error } = await supabase.auth.signOut()
				dispatch({
					type: Types.SignOut,
					payload: null,
				})
				router.push('/login')
			}}
			className='btn-secondary flex items-center gap-x-2'>
			<LogOut /> Sign out
		</button>
	)
}

export default SignOutButton

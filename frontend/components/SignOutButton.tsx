import { LogOut } from 'lucide-react'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { AppContext } from '../context/app'
import { supabase } from '../lib/api'

const SignOutButton = () => {
	const { actions } = useContext(AppContext)
	return (
		<button
			onClick={async () => {
				const { error } = await supabase.auth.signOut()
				actions.signOut()
			}}
			className='btn-secondary flex items-center gap-x-2'>
			<LogOut /> Sign out
		</button>
	)
}

export default SignOutButton

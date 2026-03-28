import { LogOut } from 'lucide-react'
import React, { useContext } from 'react'
import { AppContext } from '../context/app'

const SignOutButton = () => {
	const { actions } = useContext(AppContext)
	return (
		<button
			onClick={async () => {
				actions.signOut()
			}}
			className='btn-secondary flex items-center gap-x-2'>
			<LogOut /> Sign out
		</button>
	)
}

export default SignOutButton

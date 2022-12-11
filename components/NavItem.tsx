import { useRouter } from 'next/router'
import React, { MouseEventHandler, ReactNode } from 'react'

type NaviItemProps = {
	route?: string
	icon: ReactNode
	label: string
	callback: MouseEventHandler
}

const NavItem = ({ icon, route, label, callback }: NaviItemProps) => {
	const router = useRouter()
	return (
		<li
			onClick={callback}
			className={`btn flex flex-col p-2 gap-y-1 items-center text-center justify-center text-xs ${
				router.pathname == route ? 'opacity-100' : 'opacity-75'
			}`}>
			{icon}
			<div className='font-bold'>{label}</div>
		</li>
	)
}

export default NavItem

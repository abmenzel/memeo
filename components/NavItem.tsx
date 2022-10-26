import { LayoutGrid } from 'lucide-react'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'

type NaviItemProps = {
	route: string
	icon: ReactNode
	label: string
	active?: boolean
}

const NavItem = ({ icon, route, label, active }: NaviItemProps) => {
	const router = useRouter()
	return (
		<li
			onClick={() => router.push(route)}
			className={`btn flex flex-col p-2 gap-y-1 items-center text-center justify-center text-xs ${
				router.pathname == route ? 'opacity-100' : 'opacity-75'
			}`}>
			{icon}
			<div className={`${active ? 'font-bold' : ''}`}>{label}</div>
		</li>
	)
}

export default NavItem

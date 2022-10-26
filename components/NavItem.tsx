import { LayoutGrid } from 'lucide-react'
import React, { ReactNode } from 'react'

const NavItem = ({
	icon,
	label,
	active,
}: {
	icon: ReactNode
	label: string
	active?: boolean
}) => {
	return (
		<li
			className={`btn flex flex-col p-2 gap-y-1 items-center text-center justify-center text-xs ${
				active ? 'opacity-100' : 'opacity-75'
			}`}>
			{icon}
			<div className={`${active ? 'font-bold' : ''}`}>{label}</div>
		</li>
	)
}

export default NavItem

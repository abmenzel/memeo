import clsx from 'clsx'
import { useRouter } from 'next/router'
import { MouseEventHandler, ReactNode } from 'react'
import { Button } from './ui'

type NaviItemProps = {
	route?: string
	icon: ReactNode
	label: string
	callback: MouseEventHandler
}

const NavItem = ({ icon, route, label, callback }: NaviItemProps) => {
	const router = useRouter()
	const active = router.pathname == route
	return (
		<li
			onClick={callback}
			className={`flex flex-col p-2 gap-y-1 items-center text-center justify-center text-xs`}>
			<Button className={clsx({ '!bg-theme-button-bg-active': active })}>
				{icon}
				<div className='font-bold'>{label}</div>
			</Button>
		</li>
	)
}

export default NavItem

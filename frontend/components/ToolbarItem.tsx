import React, { ReactNode } from 'react'
import { Button } from './ui'

const ToolbarItem = ({
	icon,
	callback,
}: {
	icon: ReactNode
	callback: (event: React.MouseEvent) => void
}) => {
	return <Button onClick={callback}>{icon}</Button>
}

export default ToolbarItem

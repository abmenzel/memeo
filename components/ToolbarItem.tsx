import React, { ReactNode } from 'react'

const ToolbarItem = ({
	icon,
	callback,
}: {
	icon: ReactNode
	callback: (event: React.MouseEvent) => void
}) => {
	return (
		<button className='btn' onClick={callback}>
			{icon}
		</button>
	)
}

export default ToolbarItem

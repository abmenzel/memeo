export interface ModalState {
	show: boolean
	options: {
		title: string
		description: string
		component?: JSX.Element
		icon?: JSX.Element
		onConfirm?: () => void
	}
}

export type ShowModalConfig = {
	title: string
	description?: string
	component?: JSX.Element
	icon?: JSX.Element
	onConfirm?: () => void
}

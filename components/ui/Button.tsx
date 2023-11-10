import clsx from 'clsx'
import { Variants, motion } from 'framer-motion'

type Props = {
	className?: string
	onClick?: (event: React.MouseEvent) => void
	rounded?: boolean
	animateScale?: boolean
	variant?: 'primary' | 'secondary'
	children: React.ReactNode
}

const Button: React.FC<Props> = (props) => {
	const {
		className,
		onClick,
		variant = 'secondary',
		rounded = true,
		animateScale = true,
		...rest
	} = props

	const baseProps = clsx(
		'gap-1.5',
		'items-center',
		'cursor-pointer',
		'leading-none',
		'text-sm',
		{ 'rounded-md': rounded },
		'inline-flex',
		'transition-all',
		'p-1.5',
		'px-2',
		'no-highlight'
	)

	const secondaryProps = clsx()

	const primaryProps = clsx('text-orange-100', 'bg-theme-dark')
	const colors = {
		primary: {
			base: 'rgba(14,20,40, 1)',
			tap: 'rgba(17, 24, 48, 1)',
		},
		secondary: {
			base: 'rgba(0,0,0,0)',
			tap: 'rgba(0,0,0,0.1)',
		},
	}
	const buttonVariants: Variants = {
		initial: {
			backgroundColor: colors[variant].base,
		},
		tap: {
			scale: animateScale ? 0.9 : 1,
			backgroundColor: colors[variant].tap,
			transition: {
				duration: 0,
			},
		},
	}

	return (
		<motion.button
			variants={buttonVariants}
			initial='initial'
			whileTap='tap'
			className={clsx(
				baseProps,
				variant === 'primary' && primaryProps,
				variant === 'secondary' && secondaryProps,
				className,
				'bg-theme'
			)}
			onClick={onClick}
			{...rest}>
			{props.children}
		</motion.button>
	)
}

export default Button

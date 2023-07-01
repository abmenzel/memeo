import clsx from 'clsx'
import { Variants, motion } from 'framer-motion'

type Props = React.HTMLProps<HTMLButtonElement>

const Button: React.FC<Props> = (props) => {
	const { className, onClick } = props

	const baseProps = clsx(
		'gap-1.5',
		'items-center',
		'cursor-pointer',
		'text-sm',
		'rounded-md',
		'inline-flex',
		'transition-all',
		'p-1.5',
		'px-2'
	)

	const buttonVariants: Variants = {
		initial: {
			backgroundColor: 'rgba(0,0,0,0)',
		},
		tap: {
			scale: 1.05,
			backgroundColor: 'rgba(0,0,0,0.1)',
		},
	}

	return (
		<motion.button
			variants={buttonVariants}
			initial='initial'
			whileTap='tap'
			className={clsx(baseProps, className)}
			onClick={onClick}>
			{props.children}
		</motion.button>
	)
}

export default Button

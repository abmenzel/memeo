import { motion } from 'framer-motion'
import { ForwardedRef, forwardRef } from 'react'
type Props = {
	className?: string
}

type LoadingScreenRef = ForwardedRef<HTMLDivElement>

const LoadingScreen: React.FC<Props> = forwardRef(
	(props, ref: LoadingScreenRef) => {
		const { className } = props

		return (
			<motion.div
				initial={{ opacity: 0 }}
				exit={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				ref={ref}
				className='flex items-center justify-center flex-col h-full w-full'>
				<p className='font-extrabold text-opacity-50 text-theme-dark text-3xl font-serif mb-0 animate-pulse'>
					Memeo
				</p>
			</motion.div>
		)
	}
)

export default LoadingScreen

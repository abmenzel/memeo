import { HTMLMotionProps, motion } from 'framer-motion'
import { ForwardedRef, forwardRef } from 'react'

type PageTransitionProps = HTMLMotionProps<'div'>
type PageTransitionRef = ForwardedRef<HTMLDivElement>

const PageTransition = forwardRef(
	({ children, ...rest }: PageTransitionProps, ref: PageTransitionRef) => {
		const transition = { type: 'spring' as const, stiffness: 300, damping: 28 }

		return (
			<motion.div
				className='w-full h-full flex-grow'
				ref={ref}
				initial={{
					opacity: 0,
				}}
				animate={{
					opacity: 1,
				}}
				exit={{
					opacity: 0,
				}}
				transition={transition}
				{...rest}>
				{children}
			</motion.div>
		)
	}
)

export default PageTransition

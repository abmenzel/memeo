import clsx from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'
import {
	createContext,
	ReactNode,
	useCallback,
	useEffect,
	useState,
} from 'react'
export type ToastType = 'success' | 'error' | 'info'

const DEFAULT_TIMEOUT = 3000

export type ToastConfig = {
	message: string
	type?: ToastType
	duration?: number
}

type Toast = ToastConfig & {
	id: number
}

type ToastContextValue = {
	toast: (config: ToastConfig) => void
}

export const ToastContext = createContext<ToastContextValue>({
	toast: () => {},
})

let toastId = 0
let toastHandler: ((config: ToastConfig) => void) | null = null

export const toast = (config: ToastConfig) => {
	if (toastHandler) {
		toastHandler(config)
	}
}

type ToastProviderProps = {
	children: ReactNode
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
	const [toasts, setToasts] = useState<Toast[]>([])

	const showToast = useCallback((config: ToastConfig) => {
		const id = ++toastId
		const newToast: Toast = {
			...config,
			id,
			type: config.type || 'info',
			duration: config.duration || DEFAULT_TIMEOUT,
		}

		setToasts((prev) => [...prev, newToast])

		setTimeout(() => {
			setToasts((prev) => prev.filter((t) => t.id !== id))
		}, newToast.duration)
	}, [])

	const removeToast = useCallback((id: number) => {
		setToasts((prev) => prev.filter((t) => t.id !== id))
	}, [])

	useEffect(() => {
		toastHandler = showToast
		return () => {
			toastHandler = null
		}
	}, [showToast])

	return (
		<ToastContext.Provider value={{ toast: showToast }}>
			{children}
			<div className='fixed bottom-4 left-4 right-4 items-center z-50 flex flex-col gap-2'>
				<AnimatePresence>
					{toasts.map((t) => (
						<motion.div
							initial={{ y: 8, opacity: 0 }}
							animate={{
								y: 0,
								opacity: 1,
							}}
							exit={{ y: -8, opacity: 0 }}
							key={t.id}
							onClick={() => removeToast(t.id)}
							className={clsx(
								' bg-theme-dark px-4 py-3 rounded-lg border-theme-dark text-orange-100',
							)}>
							<p className='text-sm font-medium'>{t.message}</p>
						</motion.div>
					))}
				</AnimatePresence>
			</div>
		</ToastContext.Provider>
	)
}

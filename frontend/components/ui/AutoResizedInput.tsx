import clsx from 'clsx'
import { forwardRef, useEffect, useRef, useState } from 'react'

type Props = React.HtmlHTMLAttributes<HTMLInputElement> & {}

const AutoResizedInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
	const { className, placeholder, ...rest } = props
	const [value, setValue] = useState<string>('')
	const [width, setWidth] = useState<number>(0)
	const hiddenRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (hiddenRef.current) {
			const newWidth = hiddenRef.current.offsetWidth + 16
			if (width !== newWidth) {
				setWidth(newWidth)
			}
		}
	}, [value])

	return (
		<>
			<div
				ref={hiddenRef}
				className='pointer-events-none absolute invisible text-base'>
				{value || placeholder}
			</div>
			<div
				className={clsx(
					'py-0.5',
					'px-1',
					'rounded-md',
					'border',
					'border-theme-dark'
				)}>
				<input
					ref={ref}
					value={value}
					onChange={(e) => {
						setValue(e.target.value)
					}}
					style={{
						width: `${width}px`,
					}}
					placeholder={placeholder}
					className={clsx(
						'overflow-visible',
						'translate-x-1.5',
						'text-left',
						'min-w-0',
						'w-fit-content',

						'leading-none',
						'appearance-none',
						'bg-transparent',
						'text-theme-dark',
						'outline-none'
					)}
					{...rest}
				/>
			</div>
		</>
	)
})

export default AutoResizedInput

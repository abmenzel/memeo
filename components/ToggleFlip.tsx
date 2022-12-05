import { useContext } from 'react'
import { AppContext } from '../context/app'
import classNames from 'classnames'
import { Types } from '../reducers/reducers'

const ToggleFlip = () => {
	const { state, dispatch } = useContext(AppContext)

	return (
		<div className='rounded-lg backdrop-brightness-95 p-0.5 text-xs flex gap-1 items-center'>
			<button
				onClick={() => {
					dispatch({
						type: Types.OptionsSet,
						payload: {
							initialFlipState: false,
						},
					})
				}}
				className={classNames(
					'p-1.5 py-0.5 text-xs',
					{
						'btn-primary': !state.options.initialFlipState,
					},
					{
						'btn-secondary': state.options.initialFlipState,
					}
				)}>
				Front
			</button>
			<button
				onClick={() => {
					dispatch({
						type: Types.OptionsSet,
						payload: {
							initialFlipState: true,
						},
					})
				}}
				className={classNames(
					'p-1.5 py-0.5 text-xs',
					{
						'btn-primary': state.options.initialFlipState,
					},
					{
						'btn-secondary': !state.options.initialFlipState,
					}
				)}>
				Back
			</button>
		</div>
	)
}

export default ToggleFlip

import { Transition } from '@headlessui/react'
import { Check, Cookie, X } from 'lucide-react'
import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/app'
import { Types } from '../reducers/reducers'

const Cookies = () => {
	const { state, dispatch } = useContext(AppContext)
	useEffect(() => {
		if (state.consent === Types.ConsentLoading) {
			dispatch({
				type: Types.ConsentSet,
				payload:
					(window.localStorage.getItem('CONSENT') as
						| Types.ConsentSome
						| Types.ConsentAll) || Types.ConsentAwait,
			})
		} else if (
			state.consent === Types.ConsentSome ||
			state.consent === Types.ConsentAll
		) {
			window.localStorage.setItem('CONSENT', state.consent)
		}
	}, [state.consent])

	return (
		<>
			{state.consent === Types.ConsentAwait && (
				<div className='fixed bottom-0 z-10 p-4'>
					<div className='animate-moveUpSlight translate-y-1 border rounded-md border-black p-4 bg-orange-100'>
						<div className='md:flex items-center gap-x-5'>
							<div>
								<p className='font-bold font-serif flex items-center gap-x-2 mb-2'>
									<Cookie /> Cookies
								</p>
								<p className='text-xs md:text-sm max-w-sm'>
									Memeo only requires some functional cookies
									that are necessary to use the app. However,
									we also use Google Analytics to track how
									the app is used in order to improve it.
								</p>
							</div>
							<div className='flex flex-col text-center mt-2 gap-2 bg-theme-'>
								<button
									onClick={() => {
										dispatch({
											type: Types.ConsentSet,
											payload: Types.ConsentSome,
										})
									}}
									className='btn-secondary justify-center'>
									<X size='1rem' />
									Accept functional cookies only
								</button>
								<button
									onClick={() => {
										dispatch({
											type: Types.ConsentSet,
											payload: Types.ConsentAll,
										})
									}}
									className='btn-primary justify-center'>
									<Check size='1rem' />
									Accept all cookies
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default Cookies

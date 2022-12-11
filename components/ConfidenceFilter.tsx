import { Listbox } from '@headlessui/react'
import { Filter, Star } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/app'

const ConfidenceFilter = () => {
	const { state, actions } = useContext(AppContext)
	const [selectedInterval, setselectedInterval] = useState<number>(5)

	return (
		<Listbox value={selectedInterval} onChange={setselectedInterval}>
			<div className='relative flex flex-col items-center'>
				<Listbox.Button className='flex text-xs gap-x-2 btn-secondary items-center'>
					<Filter size={'0.9rem'} />
				</Listbox.Button>
				<Listbox.Options className='border border-black text-center items-center absolute bottom-9 bg-orange-100 rounded-md p-2 px-6 flex flex-col gap-2'>
					{[5, 4, 3, 2, 1].map((rating, index) => (
						<Listbox.Option
							key={index}
							value={rating}
							className='cursor-pointer w-full flex items-center'>
							<div className='flex items-center gap-1 text-xs whitespace-nowrap'>
								{index === 0 ? (
									<>
										<Star fill='black' size='0.8rem' />
										<p>All</p>
									</>
								) : (
									<>
										<Star fill='black' size='0.8rem' />
										<p>{`<= ${rating}`}</p>
									</>
								)}
							</div>
						</Listbox.Option>
					))}
				</Listbox.Options>
			</div>
		</Listbox>
	)
}

export default ConfidenceFilter

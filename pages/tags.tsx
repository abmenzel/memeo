import { ArrowLeft, Trash2 } from 'lucide-react'
import Head from 'next/head'
import Link from 'next/link'
import { ForwardedRef, forwardRef, useContext } from 'react'
import Tag from '../components/Tag'
import PageTransition from '../components/animations/PageTransition'
import { Button } from '../components/ui'
import { AppContext } from '../context/app'
import ITag from '../models/Tag'

type SettingsPageRef = ForwardedRef<HTMLDivElement>

const Tags = forwardRef((props, ref: SettingsPageRef) => {
	const { state, actions } = useContext(AppContext)
	const { showModal } = actions

	const handleDeleteTag = async (tag: ITag) => {
		await actions.deleteTag(tag)
	}

	return (
		<>
			<Head>
				<title>Memeo | Tags</title>
				<meta name='description' content='Memeo' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<PageTransition ref={ref}>
				<div className='relative w-full flex-grow flex items-center flex-col py-6'>
					<div className='text-center relative flex items-center justify-center w-full mb-4'>
						<Link href='/settings'>
							<Button className='absolute left-0'>
								<ArrowLeft />
							</Button>
						</Link>
						<h1 className='text-3xl font-serif font-extrabold'>
							Tags
						</h1>
					</div>
					<div className='w-full flex flex-col'>
						{state.tags.map((tag, index) => {
							return (
								<div className='flex justify-between py-4 border-b last:border-0 border-black border-opacity-10'>
									<Tag
										key={index}
										tag={tag}
										className='rounded-md px-2 py-1.5'
									/>
									<div className='flex items-center'>
										<Button
											onClick={() =>
												showModal({
													title: `Delete ${tag.name}?`,
													icon: (
														<Trash2 size={'1rem'} />
													),
													description:
														'This will permanently delete this tag.',
													onConfirm: () =>
														handleDeleteTag(tag),
												})
											}>
											<Trash2 size={'1rem'} />
										</Button>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</PageTransition>
		</>
	)
})

export default Tags

import { TextareaAutosize } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Plus, Trash2 } from 'lucide-react'
import Head from 'next/head'
import Link from 'next/link'
import {
	ForwardedRef,
	forwardRef,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react'
import PageTransition from '../components/animations/PageTransition'
import Tag from '../components/Tag'
import { Button } from '../components/ui'
import { AppContext } from '../context/app'
import { template } from '../lib/utils'
import Card from '../models/Card'
import Deck from '../models/Deck'

type EditorPageRef = ForwardedRef<HTMLDivElement>

const Editor = forwardRef((props, ref: EditorPageRef) => {
	const { state, actions } = useContext(AppContext)

	const [activeDeck, setActiveDeck] = useState<undefined | Deck>()
	const [cards, setCards] = useState<Card[]>([])
	const [focusedRow, setFocusedRow] = useState<number | null>(null)
	const [pendingDelete, setPendingDelete] = useState<number | null>(null)

	const deleteButtonRef = useRef<HTMLButtonElement | null>(null)
	const lastLoadedDeckIdRef = useRef<number | null>(null)
	const isSyncingRef = useRef(false)

	useEffect(() => {
		const deck = state.decks.find((deck) => deck.id === state.activeDeckId)
		setActiveDeck(deck)
		if (deck && deck.id !== lastLoadedDeckIdRef.current && !isSyncingRef.current) {
			setCards([...deck.cards])
			lastLoadedDeckIdRef.current = deck.id
		}
	}, [state.activeDeckId])

	useEffect(() => {
		isSyncingRef.current = false
	}, [cards])

	useEffect(() => {
		if (pendingDelete !== null) {
			const indexToDelete = pendingDelete
			const currentCards = [...cards]
			const timer = setTimeout(() => {
				const card = currentCards[indexToDelete]
				if (card && card.id > 0) {
					actions.deleteCard(card)
				}
				setCards(currentCards.filter((_, i) => i !== indexToDelete))
				setPendingDelete(null)
				setFocusedRow(null)
			}, 50)
			return () => clearTimeout(timer)
		}
	}, [pendingDelete])

	const handleFrontChange = async (index: number, value: string) => {
		const updated = [...cards]
		updated[index] = { ...updated[index], front: value }
		setCards(updated)
		if (updated[index].id > 0) {
			isSyncingRef.current = true
			await actions.updateCard(updated[index])
		}
	}

	const handleBackChange = async (index: number, value: string) => {
		const updated = [...cards]
		updated[index] = { ...updated[index], back: value }
		setCards(updated)
		if (updated[index].id > 0) {
			isSyncingRef.current = true
			await actions.updateCard(updated[index])
		}
	}

	const handleAddRow = async () => {
		if (!activeDeck) return
		const newCard = template.newCard(activeDeck.id)
		const savedCard = await actions.addCard(newCard)
		isSyncingRef.current = true
		setCards([...cards, savedCard])
		setFocusedRow(cards.length)
	}

	const handleConfirmDelete = () => {
		const card = cards[pendingDelete!]
		if (card) {
			actions.deleteCard(card)
		}
		const updated = cards.filter((_, i) => i !== pendingDelete)
		setCards(updated)
		setPendingDelete(null)
		setFocusedRow(null)
	}

	const handleDeleteClick = (index: number) => {
		actions.showModal({
			title: 'Delete Card',
			description: 'Are you sure you want to delete this card?',
			onConfirm: () => {
				const card = cards[index]
				if (card && card.id > 0) {
					actions.deleteCard(card)
				}
				const updated = cards.filter((_, i) => i !== index)
				setCards(updated)
				setFocusedRow(null)
			},
		})
	}

	return (
		<>
			<Head>
				<title>Memeo | Editor</title>
				<meta name='description' content='Memeo' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<PageTransition ref={ref}>
				<div className='w-full h-full flex flex-col'>
					<AnimatePresence>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className='text-center relative pt-4 flex items-center justify-center'>
							<Link href='/dashboard'>
								<Button className='absolute left-0'>
									<ArrowLeft />
								</Button>
							</Link>
							<div className='flex flex-col items-center'>
								{activeDeck?.tags.map((tag) => (
									<Tag className='text-[11px]' tag={tag} key={tag.id} />
								))}
								<h2 className='font-serif text-xl font-bold'>
									{activeDeck?.name}
								</h2>
							</div>
						</motion.div>
					</AnimatePresence>

					<div className='flex-grow overflow-y-auto py-6'>
						<div className='flex flex-col items-center'>
							<table className='w-full border-collapse'>
								<thead>
									<tr>
										<th className='text-left p-2 border-b border-gray-600 border-opacity-10 font-serif'>
											Front
										</th>
										<th className='text-left p-2 border-b border-gray-600 border-opacity-10 font-serif'>
											Back
										</th>
										<th className='w-12'></th>
									</tr>
								</thead>
								<tbody>
									{cards.map((card, index) => (
										<tr
											key={card.id > 0 ? card.id : `new-${index}`}
											className='transition-colors hover:bg-orange-75 hover:bg-opacity-10'>
											<td className='p-2 border-b border-gray-600 border-opacity-10'>
												<TextareaAutosize
													className='w-full bg-transparent outline-none resize-none font-serif text-sm p-1 rounded border border-transparent focus:border-theme-dark focus:border-opacity-30'
													value={card.front}
													onChange={(e) =>
														handleFrontChange(index, e.target.value)
													}
													onFocus={() => setFocusedRow(index)}
													onBlur={(e) => {
														if (
															!e.currentTarget.contains(e.relatedTarget) &&
															e.relatedTarget !== deleteButtonRef.current
														) {
															setFocusedRow(null)
														}
													}}
													placeholder='Card front'
													minRows={1}
												/>
											</td>
											<td className='p-2 border-b border-gray-600 border-opacity-10'>
												<TextareaAutosize
													className='w-full bg-transparent outline-none resize-none text-sm p-1 rounded border border-transparent focus:border-theme-dark focus:border-opacity-30'
													value={card.back}
													onChange={(e) =>
														handleBackChange(index, e.target.value)
													}
													onFocus={() => setFocusedRow(index)}
													onBlur={(e) => {
														if (
															!e.currentTarget.contains(e.relatedTarget) &&
															e.relatedTarget !== deleteButtonRef.current
														) {
															setFocusedRow(null)
														}
													}}
													placeholder='Card back'
													minRows={1}
												/>
											</td>
											<td className='p-2 border-b border-gray-600 border-opacity-10'>
												{focusedRow === index && (
													<Button
														ref={(el) => {
															deleteButtonRef.current = el
														}}
														onClick={() => handleDeleteClick(index)}
														className='p-1'>
														<Trash2 size={'1rem'} />
													</Button>
												)}
											</td>
										</tr>
									))}
									
								</tbody>
							</table>
                            <Button onClick={handleAddRow} variant='primary' className='mt-4 mx-auto'>
												<Plus size={'1rem'} /> Add Card
											</Button>
						</div>
					</div>
				</div>
			</PageTransition>
		</>
	)
})

export default Editor
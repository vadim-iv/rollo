'use client'

import { DailyBudget } from '@/utils/calculations.utils'
import { AnimatePresence, motion } from 'motion/react'
import { SpendingBottomSheet } from '../EditSpending/SpendingBottomSheet'
import { currencies } from '@/constants/currencies.constants'
import { useState } from 'react';

interface IHistoryCard {
	budgetId: string
	day: DailyBudget
	currency: string
	displayDate: string
	delay: number
}

export function HistoryCard({ budgetId, day, currency, displayDate, delay }: IHistoryCard) {
	const [isSpendingBottomSheetOpen, setIsSpendingBottomSheetOpen] = useState(false)

	const displayCurrency = currencies.find((c) => c.value === currency)?.symbol || currency
	const spent = Number(day.spent)
	const available = Number(day.available)

	const isOverBudget = (spent > available) && available > 0

	const progress = Math.min(Math.max(spent / available, 0), 1)

	const isToday = new Date(day.date).toDateString() === new Date().toDateString()

	return (
		<>
			<motion.div
				initial={{ opacity: 0, y: -12, scale: 0.95 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				transition={{ type: 'spring', stiffness: 250, damping: 20, mass: 1, delay }}
				className={`border border-border rounded-2xl px-1 py-1.25 ${isToday ? 'bg-secondary-text/10' : ''}`}
				onClick={() => setIsSpendingBottomSheetOpen(true)}
			>
				<p className='text-sm font-semibold text-secondary-text'>{displayDate}</p>

				<div className='mt-0.5 flex justify-between items-end'>
					<p className='font-semibold text-primary-text text-xl'>
						{displayCurrency} {spent.toFixed(2)}
						<span className='text-secondary-text'> / {available.toFixed(2)}</span>
					</p>

					<p className='text-sm font-semibold text-secondary-text'>{isOverBudget && '>'}{Math.floor(progress * 100)}%</p>
				</div>

				<div className='w-full mt-0.5 h-0.25 bg-border rounded-full overflow-hidden'>
					<div
						className={`transition-[transform,background-color] duration-300 h-full ${isOverBudget ? 'bg-error' : 'bg-accent'} rounded-full origin-left`}
						style={{ transform: `scaleX(${progress})` }}
					/>
				</div>
			</motion.div>

			<AnimatePresence mode='wait'>
				{isSpendingBottomSheetOpen && (
					<SpendingBottomSheet
						budgetId={budgetId}
						setIsBottomSheetOpen={setIsSpendingBottomSheetOpen}
						key='history-spending-bottom-sheet'
						currency={displayCurrency}
						date={day.date}
					/>
				)}
			</AnimatePresence>
		</>
	)
}

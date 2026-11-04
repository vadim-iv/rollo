'use client'

import { motion } from 'framer-motion'
import { DailyBudget } from '@/utils/calculations.utils'
import { HistoryCard } from './HistoryCard'

interface IHistoryBottomSheet {
	budgetId: string
	days: DailyBudget[]
	currency: string
	setIsBottomSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function HistoryBottomSheet({ budgetId, days, currency, setIsBottomSheetOpen }: IHistoryBottomSheet) {

	const toDisplayDate = (date: string) => {
		const today = new Date()

		const yesterday = new Date(today)
		yesterday.setDate(today.getDate() - 1)

		const tomorrow = new Date(today)
		tomorrow.setDate(today.getDate() + 1)

		if (date === today.toISOString().split('T')[0]) {
			return `Today  • ${Intl.DateTimeFormat('en-GB', {
				day: 'numeric',
				month: 'short',
				year: 'numeric'
			}).format(new Date(date))}`
		}
		if (date === yesterday.toISOString().split('T')[0]) {
			return `Yesterday  • ${Intl.DateTimeFormat('en-GB', {
				day: 'numeric',
				month: 'short',
				year: 'numeric'
			}).format(new Date(date))}`
		}
		if (date === tomorrow.toISOString().split('T')[0]) {
			return `Tomorrow  • ${Intl.DateTimeFormat('en-GB', {
				day: 'numeric',
				month: 'short',
				year: 'numeric'
			}).format(new Date(date))}`
		}

		return new Intl.DateTimeFormat('en-GB', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		}).format(new Date(date))
	}

	return (
		<div className='fixed inset-0 z-40 flex flex-col justify-end items-center'>
			<motion.div
				className='absolute inset-0 bg-black/25 z-50'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.3, ease: 'easeInOut' }}
				onClick={() => setIsBottomSheetOpen(false)}
			/>
			<div className="fixed bg-surface h-dvh top-full left-0 right-0"/>
			<motion.div
				className='bg-surface z-60 w-full max-h-45 h-full rounded-t-4xl border border-border border-b-0 px-2 pt-3 pb-4 flex flex-col justify-between'
				initial={{ y: '100%' }}
				animate={{ y: 0 }}
				exit={{ y: '100%' }}
				transition={{ duration: 0.3, ease: 'easeInOut' }}
			>
				<p className='text-2xl font-semibold text-primary-text'>History</p>
				<p className='mt-0.25 text-secondary-text font-semibold text-base'>Your daily spending</p>

				<div className='mt-1.5 flex flex-col gap-1 overflow-y-auto min-h-0'>
					{days.map((day, index) => (
						<HistoryCard
							key={day.date}
							day={day}
							budgetId={budgetId}
							currency={currency}
							displayDate={toDisplayDate(day.date)}
							delay={index < 10 ? index * 0.05 + 0.2 : 0}
						/>
					))}
				</div>
			</motion.div>
		</div>
	)
}

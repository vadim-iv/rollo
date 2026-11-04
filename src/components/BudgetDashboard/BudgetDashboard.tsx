'use client'

import { CalculatedBudgetResponse } from '@/types/api-response.types'
import { ProgressCircle } from './ProgressCircle'
import { ActionTextIconButton } from '../shared/ActionIconTextButton'
import { Edit } from 'lucide-react'
import { BudgetTomorrowCard } from './BudgetTomorrowCard'
import { BudgetRemainingCard } from './BudgetRemainingCard'
import { DaysLeftCard } from './DaysLeftCard'
import { SpendingBottomSheet } from './EditSpending/SpendingBottomSheet'
import { useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { HistoryBottomSheet } from './SpendingHistory/HistoryBottomSheet'

interface IBudgetDashboard {
	calculatedBudget: CalculatedBudgetResponse
}

export function BudgetDashboard({ calculatedBudget }: IBudgetDashboard) {
	const [isSpendingBottomSheetOpen, setIsSpendingBottomSheetOpen] = useState(false)
	const [isHistoryBottomSheetOpen, setIsHistoryBottomSheetOpen] = useState(false)

	return (
		<>
			<div className='mt-2 flex flex-col items-center w-full min-h-0 flex-1 overflow-y-auto'>
				<ProgressCircle
					availableAmount={calculatedBudget.today?.available || '0.00'}
					remainingAmount={calculatedBudget.today?.remaining || '0.00'}
					spentAmount={calculatedBudget.today?.spent || '0.00'}
					currency={calculatedBudget.budget.currency}
				/>

				<div className='mt-2 w-full'>
					<ActionTextIconButton
						onClick={() => setIsSpendingBottomSheetOpen(true)}
						icon={Edit}
						text='Edit spending'
					/>
				</div>

				<div className="w-full"
					onClick={() => setIsHistoryBottomSheetOpen(true)}
				>
					<BudgetTomorrowCard
						availableAmount={calculatedBudget.tomorrow?.available || '0.00'}
						currency={calculatedBudget.budget.currency}
					/>
				</div>

				<div className='flex w-full gap-1'>
					<BudgetRemainingCard
						totalAmount={calculatedBudget.budget.amount}
						days={calculatedBudget.days}
						currency={calculatedBudget.budget.currency}
					/>

					<DaysLeftCard
						startDateString={calculatedBudget.budget.startDate}
						endDateString={calculatedBudget.budget.endDate}
					/>
				</div>
			</div>

			<AnimatePresence mode='wait'>
				{isSpendingBottomSheetOpen && (
					<SpendingBottomSheet
						budgetId={calculatedBudget.budget.id}
						setIsBottomSheetOpen={setIsSpendingBottomSheetOpen}
						key='spending-bottom-sheet'
						currency={calculatedBudget.budget.currency}
					/>
				)}

				{isHistoryBottomSheetOpen && (
					<HistoryBottomSheet
						budgetId={calculatedBudget.budget.id}
						days={calculatedBudget.days}
						currency={calculatedBudget.budget.currency}
						setIsBottomSheetOpen={setIsHistoryBottomSheetOpen}
					/>
				)}
			</AnimatePresence>
		</>
	)
}

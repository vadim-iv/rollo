import { currencies } from '@/constants/currencies.constants'
import { calculateBudgetLeft, DailyBudget } from '@/utils/calculations.utils'

interface IBudgetRemainingCard {
	totalAmount: string
	currency: string
	days: DailyBudget[]
}

export function BudgetRemainingCard({ totalAmount, days, currency }: IBudgetRemainingCard) {
	const budgetLeft = Number(calculateBudgetLeft(totalAmount, days))
	const amount = Number(totalAmount)

	const isOverBudget = budgetLeft < 0
	const progress = amount > 0 ? Math.min(Math.max((amount - budgetLeft) / amount, 0), 1) : 0

	const displayCurrency = currencies.find((c) => c.value === currency)?.symbol || currency
	return (
		<div className='w-full mt-1 bg-surface rounded-2xl py-1 px-1.5 border-border border'>
			<p className='text-xs text-secondary-text font-semibold'>{isOverBudget ? "Over budget" : "Remaining"}</p>

			<p className='text-[1.125rem] text-primary-text font-bold'>
				{displayCurrency} {budgetLeft}
			</p>

			<p className='text-secondary-text text-xs font-normal'>
				of {displayCurrency} {totalAmount}
			</p>

			<div className='w-full mt-0.5 h-0.25 bg-border rounded-full'>
				<div className={`transition-[transform,background-color] duration-300 h-full ${isOverBudget ? 'bg-error' : 'bg-accent'} rounded-full origin-left`} style={{ transform: `scaleX(${progress})` }} />
			</div>
		</div>
	)
}

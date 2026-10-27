import { BudgetResponse } from '@/types/api-response.types';
import { ChevronRight } from 'lucide-react'

interface IBudgetCard {
	budget: BudgetResponse
}

export function BudgetCard({ budget }: IBudgetCard) {
	const now = new Date()
	const startDate = new Date(budget.startDate)
	const endDate = new Date(budget.endDate)

	const daysUntilStart = Math.ceil((startDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

	const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

	const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
	const progress = Math.max(0, Math.min(((totalDays - daysLeft) / totalDays) * 100, 100))

	const statusText =
		daysUntilStart > 0
			? `Starts in ${daysUntilStart} days`
			: daysLeft > 0
				? `${daysLeft} days left`
				: 'Budget expired'

	return (
		<div className='p-1.5 bg-surface border-border rounded-2xl'>
			<div className='flex justify-between'>
				<p className='text-primary-text text-[1.125rem] font-semibold'>{budget.name}</p>
				<ChevronRight className='size-[1.125rem] text-primary-text' />
			</div>

			<p className='text-primary-text font-bold text-2xl mt-1'>
				{budget.currency} {budget.amount}
			</p>
			<p className='text-secondary-text font-normal text-sm'>Remaining</p>
			<p className='text-secondary-text font-normal text-sm mt-1'>
				{statusText}
			</p>

			<div className='w-full h-0.25 bg-accent-dark rounded-full mt-0.5'>
				<div className='h-0.25 bg-accent rounded-full' style={{ width: `${progress}%` }} />
			</div>
		</div>
	)
}

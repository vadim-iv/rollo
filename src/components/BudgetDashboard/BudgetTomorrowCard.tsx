import { currencies } from '@/constants/currencies.constants'
import { Calendar } from 'lucide-react'

interface IBudgetTomorrowCard {
	availableAmount: string
	currency: string
}

export function BudgetTomorrowCard({ availableAmount, currency }: IBudgetTomorrowCard) {
	const displayCurrency = currencies.find((c) => c.value === currency)?.symbol || currency

	return (
		<div className='w-full mt-1 bg-surface rounded-2xl py-1 px-1.5 border-border border'>
			<div className='flex justify-between'>
				<p className='text-xs text-secondary-text font-semibold'>Tomorrow</p>
				<Calendar className='text-primary-text size-1.25' strokeWidth={1} />
			</div>

			<p className='text-[1.125rem] text-primary-text font-bold'>
				{displayCurrency} {availableAmount}
			</p>

			<p className='text-xs mt-0.25 text-secondary-text font-normal'>
				Calculated based on today&apos;s spending.
			</p>
		</div>
	)
}

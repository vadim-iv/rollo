import { BudgetsContainer, Header } from '@/components'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Your Budgets | Rollo',
	description:
		'Manage your budgets and see how much you can spend today. Keep your money on track with Rollo.'
}

export default function Page() {
	return (
		<div className="flex flex-col h-full">
			<Header />
      <h1 className="font-semibold text-[2rem] text-primary-text mt-3">Your Budgets</h1>

      <BudgetsContainer />
		</div>
	)
}

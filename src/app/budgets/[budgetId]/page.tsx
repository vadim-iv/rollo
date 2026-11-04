import { BudgetPageContent, Header } from '@/components'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
	title: 'Budget Dashboard',
	description: 'Track your spending, manage your budget, and see how much you can spend today.'
}

interface IBudgetPage {
	params: Promise<{ budgetId: string }>
}

export default async function BudgetPage({ params }: IBudgetPage) {
	return (
		<Suspense fallback={null}>
			<BudgetPageParamsContent params={params} />
		</Suspense>
	)
}

async function BudgetPageParamsContent({ params }: IBudgetPage) {
	const { budgetId } = await params

	return (
		<div className='flex flex-col h-full min-h-0'>
			<Header />
			<BudgetPageContent budgetId={budgetId} />
		</div>
	)
}

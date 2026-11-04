import { EditBudgetForm, Header, NavBackChevron } from '@/components'
import { PAGES } from '@/config/pages.config';
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
	title: 'Edit Budget',
	description: 'Edit your budget and manage your finances effectively.'
}

interface IBudgetPage {
	params: Promise<{ budgetId: string }>
}

export default async function EditBudgetPage({ params }: IBudgetPage) {
	return (
		<Suspense fallback={null}>
			<EditBudgetPageParamsContent params={params} />
		</Suspense>
	)
}

async function EditBudgetPageParamsContent({ params }: IBudgetPage) {
	const { budgetId } = await params
	return (
		<div className='flex flex-col h-full'>
			<Header />
			<div className='mt-3 relative flex items-center justify-center'>
				<NavBackChevron path={PAGES.getBudgetUrl(budgetId)}/>
				<h1 className='font-semibold text-[2rem] text-primary-text'>Edit Budget</h1>
			</div>

			<EditBudgetForm budgetId={budgetId}/>
		</div>
	)
}

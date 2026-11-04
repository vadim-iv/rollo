import { CreateBudgetForm, Header, NavBackChevron } from '@/components'
import { PAGES } from '@/config/pages.config';
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Create Budget',
	description: 'Set up a budget and find out how much you can spend each day.'
}

export default function CreateBudgetPage() {
	return (
		<div className='flex flex-col h-full'>
			<Header />
			<div className='mt-3 relative flex items-center justify-center'>
				<NavBackChevron path={PAGES.BUDGETS}/>
				<h1 className='font-semibold text-[2rem] text-primary-text'>Create Budget</h1>
			</div>

            <CreateBudgetForm />
		</div>
	)
}

'use client'

import { NavBackChevron } from '../shared/NavBackChevron'
import { AnimatePresence } from 'motion/react'
import { motion } from 'motion/react'
import { LogoLoader } from '../Budgets/LogoLoader'
import { EllipsisVertical } from 'lucide-react'
import { BudgetDashboard } from './BudgetDashboard'
import { useGetCalculatedBudget } from '@/hooks/budgets/useGetCalculatedBudget';
import { BudgetMenuButton } from './BudgetMenuButton';
import { PAGES } from '@/config/pages.config';

interface IBudgetPageContent {
	budgetId: string
}

export function BudgetPageContent({ budgetId }: IBudgetPageContent) {
	const { calculatedBudget, isCalculatedBudgetLoading, isCalculatedBudgetError } = useGetCalculatedBudget(budgetId)

	return (
		<div className='flex flex-col flex-1 min-h-0'>
			<div className='flex-1 min-h-0 flex flex-col gap-2'>
				<AnimatePresence mode='wait' initial={false}>
					{isCalculatedBudgetError || isCalculatedBudgetLoading || !calculatedBudget ? (
						<motion.div
							key='budget-status'
							exit={{ y: -10, opacity: 0 }}
							className='h-full flex flex-col items-center justify-center'
						>
							<LogoLoader isLoading={isCalculatedBudgetLoading} />
							{isCalculatedBudgetLoading && (
								<div className='flex flex-col gap-0.5 items-center max-w-15 mt-1.5'>
									<p className='text-center font-semibold text-[1.125rem] text-primary-text'>
										Loading budget
									</p>
									<p className='text-center font-normal text-secondary-text text-base'>
										Your budget is on its way. Just a moment.
									</p>
								</div>
							)}
							{isCalculatedBudgetError && (
								<div className='flex flex-col gap-0.5 items-center max-w-15 mt-1.5'>
									<p className='text-center font-semibold text-[1.125rem] text-primary-text'>
										Couldn&apos;t load budget
									</p>
									<p className='text-center font-normal text-secondary-text text-base'>
										Something went wrong while loading your budget. Please try again.
									</p>
								</div>
							)}
						</motion.div>
					) : (
						<motion.div key='budget-title' className="flex flex-1 min-h-0 flex-col">
							<div className='mt-3 relative flex items-center justify-center'>
								<NavBackChevron path={PAGES.BUDGETS}/>
								<h1 className='font-semibold text-[2rem] text-primary-text'>{calculatedBudget.budget.name}</h1>
								<BudgetMenuButton budgetId={calculatedBudget.budget.id}/>
							</div>

							<BudgetDashboard calculatedBudget={calculatedBudget} />
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	)
}

'use client'

import { useGetAllBudgets } from '@/hooks/budgets/useGetAllBudgets'
import { AnimatePresence, motion } from 'motion/react'
import { LogoLoader } from './LogoLoader'
import { LinkTextButton } from '../shared/LinkTextButton'
import { PAGES } from '@/config/pages.config'
import { BugetsList } from './BugetsList'

export function BudgetsContainer() {
    const { budgets, isAllBudgetsError, isAllBudgetsLoading } = useGetAllBudgets()
	return (
		<div className='flex-1 min-h-0 flex flex-col gap-2 justify-end mt-2'>
			<AnimatePresence>
				{(isAllBudgetsLoading || isAllBudgetsError || !budgets?.length) && (
					<motion.div
						exit={{ y: -10, opacity: 0 }}
						className='h-full flex flex-col items-center justify-center'
					>
						<LogoLoader isLoading={isAllBudgetsLoading} />
						{isAllBudgetsLoading && (
							<div className='flex flex-col gap-0.5 items-center max-w-15 mt-1.5'>
								<p className='text-center font-semibold text-[1.125rem] text-primary-text'>
									Loading budgets
								</p>
								<p className='text-center font-normal text-secondary-text text-base'>
									Your budgets are on their way. Just a moment.
								</p>
							</div>
						)}
						{isAllBudgetsError && (
							<div className='flex flex-col gap-0.5 items-center max-w-15 mt-1.5'>
								<p className='text-center font-semibold text-[1.125rem] text-primary-text'>
									Couldn't load budgets
								</p>
								<p className='text-center font-normal text-secondary-text text-base'>
									Something went wrong while loading your budgets. Please try again.
								</p>
							</div>
						)}
						{!isAllBudgetsLoading && !isAllBudgetsError && !budgets?.length && (
							<div className='flex flex-col gap-0.5 items-center max-w-15 mt-1.5'>
								<p className='text-center font-semibold text-[1.125rem] text-primary-text'>
									No budgets yet
								</p>
								<p className='text-center font-normal text-secondary-text text-base'>
									Create your first budget and know what you can spend each day.
								</p>
							</div>
						)}
					</motion.div>
				)}
			</AnimatePresence>

			{budgets && budgets.length > 0 && <BugetsList budgets={budgets} />}

			<LinkTextButton text='Create budget' href={PAGES.CREATE_BUDGET} />
		</div>
	)
}

import { BudgetResponse } from '@/types/api-response.types';
import { BudgetCard } from './BudgetCard'
import { motion, type Variants } from 'motion/react'

interface IBudgetsList {
	budgets: BudgetResponse[]
}

const listVariants: Variants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.15
		}
	}
}

const cardVariants: Variants = {
	hidden: {
		opacity: 0,
		y: -12,
		scale: 0.95
	},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			duration: 0.2,
			ease: 'easeInOut'
		}
	}
}

export function BugetsList({ budgets }: IBudgetsList) {
	return (
		<motion.div
			variants={listVariants}
			initial='hidden'
			animate='visible'
			className='flex-1 min-h-0 overflow-y-auto flex flex-col gap-1.5'
		>
			{budgets.map((budget) => (
				<motion.div key={budget.id} variants={cardVariants}>
					<BudgetCard budget={budget} />
				</motion.div>
			))}
		</motion.div>
	)
}

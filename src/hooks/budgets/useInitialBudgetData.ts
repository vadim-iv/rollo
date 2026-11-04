import { budgetService } from '@/services/budget.service'
import { UpdateBudgetInput } from '@/validations/budget.validations'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { UseFormReset } from 'react-hook-form'

export function useInitialBudgetData(budgetId: string, reset: UseFormReset<UpdateBudgetInput>) {
	const { data : budget, isLoading: isInitialDataLoading, isSuccess } = useQuery({
		queryKey: ['budget', budgetId],
		queryFn: () => budgetService.getById(budgetId)
	})

	const initializedKey = useRef<string | null>(null)

	useEffect(() => {
		const key = budgetId
		if (!budget || initializedKey.current === key) return

		if (isSuccess && budget) {
			reset({
				name: budget.name,
				amount: budget.amount.toString(),
				currency: budget.currency,
				startDate: budget.startDate,
				endDate: budget.endDate
			})
		}

		initializedKey.current = key
	}, [isSuccess, budget, reset, budgetId])

	return { isInitialDataLoading }
}

import { budgetService } from '@/services/budget.service'
import { BudgetFormValues } from '@/validations/budget.validations'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { UseFormReset } from 'react-hook-form'

export function useInitialBlogData(id: string, reset: UseFormReset<BudgetFormValues>) {
	const { data : budget, isLoading, isSuccess } = useQuery({
		queryKey: ['budget', id],
		queryFn: () => budgetService.getById(id)
	})

	useEffect(() => {
		if (isSuccess && budget) {
			reset({
				name: budget.name,
				amount: budget.amount.toString(),
				currency: budget.currency,
				startDate: budget.startDate.toISOString().slice(0, 10),
				endDate: budget.endDate.toISOString().slice(0, 10)
			})
		}
	}, [isSuccess, budget, reset])

	return { isLoading }
}

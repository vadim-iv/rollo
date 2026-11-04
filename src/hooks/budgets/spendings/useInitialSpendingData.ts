import { DailySpendingInput } from '@/validations/daily-spending.validations'
import { UseFormReset } from 'react-hook-form'
import { useGetCalculatedBudget } from '../useGetCalculatedBudget'
import { useEffect } from 'react'

export function useInitialSpendingData(
	budgetId: string,
	date: string,
	reset: UseFormReset<DailySpendingInput>
) {
	const { calculatedBudget, isCalculatedBudgetLoading } = useGetCalculatedBudget(budgetId)


	useEffect(() => {
		if (!calculatedBudget) return

		const spending = calculatedBudget.days.find((day) => day.date === date)

		reset({
			amount: spending?.spent.toString() || ''
		})
	}, [budgetId, calculatedBudget, date, reset])

	return { isCalculatedBudgetLoading }
}

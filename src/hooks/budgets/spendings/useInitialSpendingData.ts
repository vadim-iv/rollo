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

		const spending = calculatedBudget.dailySpendings.find(
			(dailySpending) => dailySpending.date === date
		)

		if (!spending) return

		reset({
			amount: spending.amount.toString()
		})
	}, [calculatedBudget, date, reset])

	return { isCalculatedBudgetLoading }
}

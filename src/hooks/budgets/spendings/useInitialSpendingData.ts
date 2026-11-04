import { DailySpendingInput } from '@/validations/daily-spending.validations'
import { UseFormReset } from 'react-hook-form'
import { useGetCalculatedBudget } from '../useGetCalculatedBudget'
import { useEffect, useRef } from 'react'

export function useInitialSpendingData(
	budgetId: string,
	date: string,
	reset: UseFormReset<DailySpendingInput>
) {
	const { calculatedBudget, isCalculatedBudgetLoading } = useGetCalculatedBudget(budgetId)

	const initializedKey = useRef<string | null>(null)

	useEffect(() => {
		const key = budgetId + ':' + date
		if (!calculatedBudget || initializedKey.current === key) return

		const spending = calculatedBudget.days.find((day) => day.date === date)

		reset({
			amount: spending?.spent.toString() || ''
		})
		initializedKey.current = key
	}, [budgetId, calculatedBudget, date, reset])

	return { isCalculatedBudgetLoading }
}

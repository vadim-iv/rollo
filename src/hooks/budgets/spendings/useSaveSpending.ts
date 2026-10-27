import { budgetService } from '@/services/budget.service'
import { DailySpendingInput } from '@/validations/daily-spending.validations'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useSaveSpending(budgetId: string, date: string) {
	const queryClient = useQueryClient()

	const { mutate: saveSpending, isPending: isSaveSpendingPending } = useMutation({
		mutationKey: ['save spending', budgetId, date],
		mutationFn: (data: DailySpendingInput) =>
			budgetService.saveSpending(budgetId, date, data.amount),
		onSuccess: () => {
			toast.success('Done. Your spending is accounted for.')
			queryClient.invalidateQueries({ queryKey: ['calculated budget', budgetId] })
		},
		onError: () => {
			toast.error("Couldn't save spending. Try again.")
		}
	})

	return { saveSpending, isSaveSpendingPending }
}

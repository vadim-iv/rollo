import { budgetService } from '@/services/budget.service'
import { UpdateBudgetInput } from '@/validations/budget.validations'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios';
import { toast } from 'sonner'

export function useUpdateBudget(budgetId: string) {
	const queryClient = useQueryClient()

	const { mutate: updateBudget, isPending: isUpdateBudgetPending } = useMutation({
		mutationKey: ['update budget'],
		mutationFn: (data: UpdateBudgetInput) => budgetService.update(budgetId, data),
		onSuccess: () => {
			toast.success('Changes saved. Nice.')
			queryClient.invalidateQueries({ queryKey: ['budgets'] })
			queryClient.invalidateQueries({ queryKey: ['budget', budgetId] })
			queryClient.invalidateQueries({ queryKey: ['calculated budget', budgetId] })
		},
		onError: (error) => {
			const message = axios.isAxiosError(error) ? error.response?.data?.error?.message : undefined

			toast.error(message || 'Something went wrong. Classic.')
		}
	})

	return { updateBudget, isUpdateBudgetPending }
}

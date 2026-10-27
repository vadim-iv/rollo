import { budgetService } from '@/services/budget.service'
import { CreateBudgetInput } from '@/validations/budget.validations'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useCreateBudget() {
	const queryClient = useQueryClient()

	const { mutate: createBudget, isPending: isCreateBudgetPending } = useMutation({
		mutationKey: ['create budget'],
		mutationFn: (data: CreateBudgetInput) => budgetService.create(data),
		onSuccess: () => {
			toast.success('It\'s official. You\'re allowed to spend money now.')
			queryClient.invalidateQueries({ queryKey: ['budgets'] })
			queryClient.invalidateQueries({ queryKey: ['calculated budget'] })
		},
		onError: () => {
			toast.error('Your budget escaped. Try again.')
		}
	})

	return { createBudget, isCreateBudgetPending }
}

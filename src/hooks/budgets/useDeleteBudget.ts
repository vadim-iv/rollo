import { budgetService } from "@/services/budget.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteBudget(budgetId: string) {
	const queryClient = useQueryClient()

    const { mutate: deleteBudget, isPending: isDeleteBudgetPending } = useMutation({
        mutationKey: ['delete budget'],
        mutationFn: () => budgetService.delete(budgetId),
        onSuccess: () => {
            toast.success('Budget gone.')
            queryClient.invalidateQueries({ queryKey: ['budgets'] })
            queryClient.invalidateQueries({ queryKey: ['calculated budget', budgetId] })
        },
        onError: () => {
            toast.error('Budget\'s still here. Try again.')
        }
    })
    
    return {deleteBudget, isDeleteBudgetPending}
}

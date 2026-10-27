import { budgetService } from "@/services/budget.service";
import { useQuery } from "@tanstack/react-query";

export function useGetBudget(budgetId: string) {
    const { data: budget, isLoading: isBudgetLoading, isError: isBudgetError } = useQuery({
        queryKey: ['budget', budgetId],
        queryFn: () => budgetService.getById(budgetId)
    })

	return { budget, isBudgetLoading, isBudgetError }
}

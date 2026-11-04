import { budgetService } from "@/services/budget.service";
import { useQuery } from "@tanstack/react-query";

export function useGetCalculatedBudget(budgetId: string) {
    const { data: calculatedBudget, isLoading: isCalculatedBudgetLoading, isError: isCalculatedBudgetError } = useQuery({
        queryKey: ['calculated budget', budgetId],
        queryFn: () => budgetService.getCalculatedBudget(budgetId)
    })
	return { calculatedBudget, isCalculatedBudgetLoading, isCalculatedBudgetError }
}

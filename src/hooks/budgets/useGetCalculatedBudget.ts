import { budgetService } from "@/services/budget.service";
import { useQuery } from "@tanstack/react-query";

export function useGetCalculatedBudget(budgetId: string) {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const { data: calculatedBudget, isLoading: isCalculatedBudgetLoading, isError: isCalculatedBudgetError } = useQuery({
        queryKey: ['calculated budget', budgetId, timeZone],
        queryFn: () => budgetService.getCalculatedBudget(budgetId, timeZone)
    })
	return { calculatedBudget, isCalculatedBudgetLoading, isCalculatedBudgetError }
}

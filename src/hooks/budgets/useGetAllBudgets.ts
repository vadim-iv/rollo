import { budgetService } from "@/services/budget.service";
import { useQuery } from "@tanstack/react-query";

export function useGetAllBudgets() {
    const { data: budgets, isLoading: isAllBudgetsLoading, isError: isAllBudgetsError } = useQuery({
        queryKey: ['budgets'],
        queryFn: () => budgetService.getAll()
    })

	return { budgets, isAllBudgetsLoading, isAllBudgetsError }
}

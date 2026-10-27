import { budgetService } from "@/services/budget.service";
import { useQuery } from "@tanstack/react-query";

export function useGetAllSpendings(budgetId: string) {
    const { data: spendings, isLoading: isAllSpendingsLoading, isError: isAllSpendingsError } = useQuery({
        queryKey: ['spendings', budgetId],
        queryFn: () => budgetService.getSpendings(budgetId)
    })

	return { spendings, isAllSpendingsLoading, isAllSpendingsError }
}

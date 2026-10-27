import { Budget } from "@/generated/prisma/client";

export const serializeBudget = (budget: Budget) => {
	return {
		...budget,
		amount: budget.amount.toString(),
		startDate: budget.startDate.toISOString().slice(0, 10),
		endDate: budget.endDate.toISOString().slice(0, 10)
	}
}
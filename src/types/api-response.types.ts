import { DailyBudget } from "@/utils/calculations.utils";

export interface BudgetResponse {
  id: string
  userId: string
  name: string
  amount: string
  currency: string
  startDate: string
  endDate: string
  createdAt: string
  updatedAt: string
}

export interface CalculatedBudgetResponse {
  budget: BudgetResponse
  today: DailyBudget | null
  tomorrow: DailyBudget | null
  days: DailyBudget[]
}
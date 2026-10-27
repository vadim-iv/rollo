import { api } from '@/lib/axios'
import { BudgetResponse } from '@/types/api-response.types';
import { CalculateBudgetInput } from '@/utils/calculations.utils'
import { CreateBudgetInput, UpdateBudgetInput } from '@/validations/budget.validations'

class BudgetService {
	private readonly BASE_URL = '/budgets'

	async getAll() {
		const response = await api.get<BudgetResponse[]>(this.BASE_URL)
		return response.data
	}

	async getById(budgetId: string) {
		const response = await api.get<BudgetResponse>(`${this.BASE_URL}/${budgetId}`)
		return response.data
	}

	async create(data: CreateBudgetInput) {
		const response = await api.post<BudgetResponse>(this.BASE_URL, data)
		return response.data
	}

	async update(budgetId: string, data: UpdateBudgetInput) {
		const response = await api.put<BudgetResponse>(`${this.BASE_URL}/${budgetId}`, data)
		return response.data
	}

	async delete(budgetId: string) {
		const response = await api.delete(`${this.BASE_URL}/${budgetId}`)
		return response.data
	}

	async getCalculatedBudget(budgetId: string) {
		const response = await api.get<CalculateBudgetInput>(
			`${this.BASE_URL}/${budgetId}/calculated-budget`
		)
		return response.data
	}

	async getSpendings(budgetId: string) {
		const response = await api.get(`${this.BASE_URL}/${budgetId}/spendings`)
		return response.data
	}

	async saveSpending(budgetId: string, date: string, amount: string) {
		const response = await api.put(`${this.BASE_URL}/${budgetId}/spendings/${date}`, { amount })
		return response.data
	}

	async deleteSpending(budgetId: string, date: string) {
		const response = await api.delete(`${this.BASE_URL}/${budgetId}/spendings/${date}`)
		return response.data
	}
}

export const budgetService = new BudgetService()

class PagesConfig {
  BUDGETS = '/'
  LOGIN = '/login'
  CREATE_BUDGET = '/budgets/create-budget'

  getBudgetUrl(budgetId: string) {
    return `/budgets/${budgetId}`
  }

  getEditBudgetUrl(budgetId: string) {
    return `/budgets/${budgetId}/edit-budget`
  }
}

export const PAGES = new PagesConfig()
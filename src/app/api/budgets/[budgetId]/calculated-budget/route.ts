import { getAuthUser } from '@/lib/auth-user'
import { prisma } from '@/lib/prisma'
import { serializeBudget } from '@/utils/budget.utils'
import { calculateBudget } from '@/utils/calculations.utils'
import { NextResponse } from 'next/server'

type RouteContext = {
	params: Promise<{ budgetId: string }>
}

export async function GET(_request: Request, context: RouteContext) {
	try {
		const user = await getAuthUser()

		if (!user) {
			return new Response(
				JSON.stringify({
					error: {
						code: 'UNAUTHORIZED',
						message: 'Please sign in to view this budget.'
					}
				}),
				{ status: 401 }
			)
		}

		const { budgetId } = await context.params

		const budget = await prisma.budget.findFirst({
			where: { id: budgetId, userId: user.id },
			include: {
				dailySpendings: {
					orderBy: { date: 'asc' }
				}
			}
		})

		if (!budget) {
			return NextResponse.json(
				{
					error: {
						code: 'NOT_FOUND',
						message: 'Budget not found.'
					}
				},
				{ status: 404 }
			)
		}

		const days = calculateBudget({
			amount: budget.amount.toString(),
			startDate: budget.startDate.toISOString().slice(0, 10),
			endDate: budget.endDate.toISOString().slice(0, 10),
			dailySpendings: budget.dailySpendings.map((spending) => ({
				date: spending.date.toISOString().slice(0, 10),
				amount: spending.amount.toString()
			}))
		})

		const today = new Date().toISOString().slice(0, 10)

		const todaySummary = days.find((day) => day.date === today)

		const tomorrow = new Date(today)
		tomorrow.setDate(tomorrow.getUTCDate() + 1)
		const tomorrowDate = tomorrow.toISOString().slice(0, 10)
		const tomorrowSummary = days.find((day) => day.date === tomorrowDate)

		return NextResponse.json({
			budget: serializeBudget(budget),
			today: todaySummary ?? null,
			tomorrow: tomorrowSummary ?? null,
			days
		})
	} catch (error) {
		console.error('GET /api/budgets/[budgetId] failed:', error)

		return NextResponse.json(
			{
				error: {
					code: 'INTERNAL_SERVER_ERROR',
					message: 'An unexpected error occurred while fetching the budget.'
				}
			},
			{ status: 500 }
		)
	}
}

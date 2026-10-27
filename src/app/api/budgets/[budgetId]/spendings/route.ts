import { getAuthUser } from '@/lib/auth-user'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

type RouteContext = {
	params: Promise<{
		budgetId: string
	}>
}

export async function GET(_request: Request, context: RouteContext) {
	try {
		const user = await getAuthUser()

		if (!user) {
			return NextResponse.json(
				{
					error: {
						code: 'UNAUTHORIZED',
						message: 'Please sign in to view this budget.'
					}
				},
				{ status: 401 }
			)
		}

		const { budgetId } = await context.params

		const budget = await prisma.budget.findFirst({
			where: { id: budgetId, userId: user.id },
			select: { id: true }
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

		const spendings = await prisma.dailySpending.findMany({
			where: { budgetId },
			orderBy: { date: 'asc' }
		})

		return NextResponse.json(
			spendings.map((spending) => ({
				id: spending.id,
				budgetId: spending.budgetId,
				date: spending.date.toISOString().slice(0, 10),
				amount: spending.amount.toString(),
				createdAt: spending.createdAt,
				updatedAt: spending.updatedAt
			}))
		)
	} catch (error) {
		console.error('GET /api/budgets/[budgetId]/spendings failed:', error)

		return NextResponse.json(
			{
				error: {
					code: 'INTERNAL_SERVER_ERROR',
					message: 'An unexpected error occurred while fetching the spendings.'
				}
			},
			{ status: 500 }
		)
	}
}

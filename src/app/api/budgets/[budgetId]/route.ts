import { getAuthUser } from '@/lib/auth-user'
import { prisma } from '@/lib/prisma'
import { serializeBudget } from '@/utils/budget.utils'
import { updateBudgetSchema } from '@/validations/budget.validations'
import { NextResponse } from 'next/server'

type RouteContext = {
	params: Promise<{ budgetId: string }>
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
			where: { id: budgetId, userId: user.id }
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

		return NextResponse.json(serializeBudget(budget))
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

export async function PATCH(_request: Request, context: RouteContext) {
	try {
		const user = await getAuthUser()

		if (!user) {
			return NextResponse.json(
				{
					error: {
						code: 'UNAUTHORIZED',
						message: 'Please sign in to update this budget.'
					}
				},
				{ status: 401 }
			)
		}

		const { budgetId } = await context.params

		let body: unknown
		try {
			body = await _request.json()
		} catch {
			return NextResponse.json(
				{
					error: {
						code: 'BAD_REQUEST',
						message: 'Please provide valid JSON.'
					}
				},
				{ status: 400 }
			)
		}

		const result = updateBudgetSchema.safeParse(body)

		if (!result.success) {
			return NextResponse.json(
				{
					error: {
						code: 'VALIDATION_ERROR',
						message: 'Please check the information you entered.',
						details: result.error.issues.map((issue) => ({
							field: issue.path.join('.'),
							message: issue.message
						}))
					}
				},
				{ status: 400 }
			)
		}

		const input = result.data

		const budget = await prisma.budget.findFirst({
			where: { id: budgetId, userId: user.id }
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

		const newStartDate = input.startDate ? new Date(input.startDate) : budget.startDate
		const newEndDate = input.endDate ? new Date(input.endDate) : budget.endDate

		if (newStartDate > newEndDate) {
			return NextResponse.json(
				{
					error: {
						code: 'BAD_REQUEST',
						message: 'The start date must be before the end date.',
						details: [
							{
								field: 'endDate',
								message: "Time travel isn't supported."
							}
						]
					}
				},
				{ status: 400 }
			)
		}

		const excludesExistingDates = newStartDate > budget.startDate || newEndDate < budget.endDate

		if (excludesExistingDates) {
			const spendingOutsideRange = await prisma.dailySpending.findFirst({
				where: {
					budgetId,
					OR: [{ date: { lt: newStartDate } }, { date: { gt: newEndDate } }]
				}
			})

			if (spendingOutsideRange) {
				return NextResponse.json(
					{
						error: {
							code: 'DATE_RANGE_CONTAINS_SPENDING',
							message:
								'Some spending records fall outside these dates. Edit or delete those records before shortening the budget period.',
							details: [
								{
									field: 'startDate',
									message: 'Whoa, you’re leaving some spending behind! Check your start date.'
								},
								{
									field: 'endDate',
									message: 'Whoa, you’re leaving some spending behind! Check your end date.'
								}
							]
						}
					},
					{ status: 400 }
				)
			}
		}

		const updatedBudget = await prisma.budget.update({
			where: { id: budgetId },
			data: {
				name: input.name,
				amount: input.amount,
				currency: input.currency,
				startDate: newStartDate,
				endDate: newEndDate
			}
		})

		return NextResponse.json(serializeBudget(updatedBudget))
	} catch (error) {
		console.error('PATCH /api/budgets/[budgetId] failed:', error)

		return NextResponse.json(
			{
				error: {
					code: 'INTERNAL_SERVER_ERROR',
					message: 'An unexpected error occurred while updating the budget.'
				}
			},
			{ status: 500 }
		)
	}
}

export async function DELETE(_request: Request, context: RouteContext) {
	try {
		const user = await getAuthUser()

		if (!user) {
			return NextResponse.json(
				{
					error: {
						code: 'UNAUTHORIZED',
						message: 'You must be logged in to delete a budget.'
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

		await prisma.budget.delete({
			where: { id: budgetId }
		})

		return NextResponse.json(
			{
				message: 'Budget deleted successfully.'
			},
			{ status: 200 }
		)
	} catch (error) {
		console.error('DELETE /api/budgets/[budgetId] failed:', error)

		return NextResponse.json(
			{
				error: {
					code: 'INTERNAL_SERVER_ERROR',
					message: 'An unexpected error occurred while deleting the budget.'
				}
			},
			{ status: 500 }
		)
	}
}

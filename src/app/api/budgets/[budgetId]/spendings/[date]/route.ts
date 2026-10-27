import { getAuthUser } from '@/lib/auth-user'
import { prisma } from '@/lib/prisma'
import { dailySpendingSchema } from '@/validations/daily-spending.validations'
import { NextResponse } from 'next/server'

type RouteContext = {
	params: Promise<{
		budgetId: string
		date: string
	}>
}

export async function PUT(request: Request, context: RouteContext) {
	try {
		const user = await getAuthUser()

		if (!user) {
			return NextResponse.json(
				{
					error: {
						message: 'You must be logged in to update a budget.'
					}
				},
				{ status: 401 }
			)
		}

		const { budgetId, date } = await context.params

		const regex = /^\d{4}-\d{2}-\d{2}$/
		if (!regex.test(date)) {
			return NextResponse.json(
				{
					error: {
						code: 'INVALID_DATE',
						message: 'Please provide a valid date.'
					}
				},
				{ status: 400 }
			)
		}

		const parsedDate = new Date(date)

		if (Number.isNaN(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== date) {
			return NextResponse.json(
				{
					error: {
						code: 'INVALID_DATE',
						message: 'Please provide a valid date.'
					}
				},
				{ status: 400 }
			)
		}

		let body: unknown
		try {
			body = await request.json()
		} catch (error) {
			return NextResponse.json(
				{
					error: {
						code: 'INVALID_JSON',
						message: 'Please provide valid JSON.'
					}
				},
				{ status: 400 }
			)
		}

		const result = dailySpendingSchema.safeParse(body)

		if (!result.success) {
			return NextResponse.json(
				{
					error: {
						code: 'VALIDATION_ERROR',
						message: 'Please check the amount you entered.',
						details: result.error.issues.map((issue) => ({
							field: issue.path.join('.'),
							message: issue.message
						}))
					}
				},
				{ status: 400 }
			)
		}

		const budget = await prisma.budget.findFirst({
			where: { id: budgetId, userId: user.id },
			select: {
				id: true,
				startDate: true,
				endDate: true
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

		if (parsedDate < budget.startDate || parsedDate > budget.endDate) {
			return NextResponse.json(
				{
					error: {
						code: 'DATE_OUT_OF_RANGE',
						message: 'The date is out of the budget range.'
					}
				},
				{ status: 400 }
			)
		}

		const spending = await prisma.dailySpending.upsert({
			where: {
				budgetId_date: {
					budgetId,
					date: parsedDate
				}
			},
			create: {
				budgetId,
				date: parsedDate,
				amount: result.data.amount
			},
			update: {
				amount: result.data.amount
			}
		})

		return NextResponse.json(
			{
				id: spending.id,
				budgetId: spending.budgetId,
				date: spending.date.toISOString().slice(0, 10),
				amount: spending.amount.toString(),
				createdAt: spending.createdAt,
				updatedAt: spending.updatedAt
			},
			{ status: 200 }
		)
	} catch (error) {
		console.error('PUT /api/budgets/[budgetId]/spendings/[date] failed:', error)

		return NextResponse.json(
			{
				error: {
					code: 'INTERNAL_SERVER_ERROR',
					message: 'An unexpected error occurred.'
				}
			},
			{ status: 500 }
		)
	}
}

export async function DELETE(request: Request, context: RouteContext) {
	try {
		const user = await getAuthUser()

		if (!user) {
			return NextResponse.json(
				{
					error: {
						code: 'UNAUTHORIZED',
						message: 'You must be logged in to delete a daily spending.'
					}
				},
				{ status: 401 }
			)
		}

		const { budgetId, date } = await context.params

		const regex = /^\d{4}-\d{2}-\d{2}$/
		if (!regex.test(date)) {
			return NextResponse.json(
				{
					error: {
						code: 'INVALID_DATE',
						message: 'Please provide a valid date.'
					}
				},
				{ status: 400 }
			)
		}

		const parsedDate = new Date(date)

		if (Number.isNaN(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== date) {
			return NextResponse.json(
				{
					error: {
						code: 'INVALID_DATE',
						message: 'Please provide a valid date.'
					}
				},
				{ status: 400 }
			)
		}

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

		const spending = await prisma.dailySpending.findFirst({
			where: { budgetId, date: parsedDate },
			select: { id: true }
		})

		if (!spending) {
			return NextResponse.json(
				{
					error: {
						code: 'NOT_FOUND',
						message: 'Daily spending not found.'
					}
				},
				{ status: 404 }
			)
		}

		await prisma.dailySpending.delete({
			where: { id: spending.id }
		})

		return NextResponse.json(
			{
				message: 'Daily spending deleted successfully.'
			},
			{ status: 200 }
		)
	} catch (error) {
		console.error('DELETE /api/budgets/[budgetId]/spendings/[date] failed:', error)

		return NextResponse.json(
			{
				error: {
					code: 'INTERNAL_SERVER_ERROR',
					message: 'An unexpected error occurred while deleting the daily spending.'
				}
			},
			{ status: 500 }
		)
	}
}

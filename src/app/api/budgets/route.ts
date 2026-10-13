import { Budget } from '@/generated/prisma/client'
import { getAuthUser } from '@/lib/auth-user'
import { prisma } from '@/lib/prisma'
import { createBudgetSchema } from '@/lib/validations/budget'
import { NextResponse } from 'next/server'

const serializeBudget = (budget: Budget) => {
	return {
		...budget,
		amount: budget.amount.toString(),
		startDate: budget.startDate.toISOString().slice(0, 10),
		endDate: budget.endDate.toISOString().slice(0, 10)
	}
}

export async function GET() {
	try {
		const user = await getAuthUser()

		if (!user) {
			return NextResponse.json(
				{
					error: {
						code: 'UNAUTHORIZED',
						message: 'Please sign in to view your budgets.'
					}
				},
				{ status: 401 }
			)
		}

		const budgets = await prisma.budget.findMany({
			where: { userId: user.id },
			orderBy: { createdAt: 'desc' }
		})

		return NextResponse.json(budgets.map(serializeBudget))
	} catch (error) {
		console.error('GET /api/budgets failed:', error)
		return NextResponse.json(
			{
				error: {
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Something went wrong. Please try again.'
				}
			},
			{ status: 500 }
		)
	}
}

export async function POST(request: Request) {
	try {
		const user = await getAuthUser()

		if (!user) {
			return NextResponse.json(
				{
					error: {
						code: 'UNAUTHORIZED',
						message: 'Please sign in to create a budget.'
					}
				},
				{ status: 401 }
			)
		}

		let body: unknown
		try {
			body = await request.json()
		} catch (error) {
            console.warn('Failed to parse JSON body:', error)

			return NextResponse.json(
				{
					error: {
						code: 'BAD_REQUEST',
						message: 'Invalid JSON body.'
					}
				},
				{ status: 400 }
			)
		}

		const result = createBudgetSchema.safeParse(body)

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

		const budget = await prisma.budget.create({
			data: {
				...input,
				startDate: new Date(input.startDate),
				endDate: new Date(input.endDate),
				userId: user.id
			}
		})
		return NextResponse.json(serializeBudget(budget), { status: 201 })
	} catch (error) {
		console.error('POST /api/budgets failed:', error)
		return NextResponse.json(
			{
				error: {
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Something went wrong. Please try again.'
				}
			},
			{ status: 500 }
		)
	}
}

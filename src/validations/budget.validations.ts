import { z } from 'zod'

const dateSchema = z.iso.date({ error: "Pick some valid dates, please." })

const budgetObjectSchema = z.object({
	name: z
		.string({ error: 'Give your budget a name.' })
		.trim()
		.min(1, 'Give your budget a name.')
		.max(100, "That's a long name for a budget."),
	amount: z
		.string({ error: 'How much are we working with?' })
		.min(1, 'How much are we working with?')
		.regex(/^-?\d{1,10}(\.\d{1,2})?$/, 'Please enter a valid number with up to 2 decimal places.')
		.refine((val) => Number(val) > 0, {
			message: 'Nice try. Your budget needs to be above zero.'
		})
		.refine((value) => Number(value) <= 9_999_999.99, "You don't have that much money."),
	currency: z
		.string({ error: 'Money needs a currency, too.' })
		.trim()
		.regex(/^[A-Z]{3}$/, {
			message: 'Pick a currency, please.'
		}),
	startDate: dateSchema,
	endDate: dateSchema
})

export const createBudgetSchema = budgetObjectSchema.refine(
	(date) => date.endDate >= date.startDate,
	{
		path: ['endDate'],
		message: "Time travel isn't supported."
	}
)

export const updateBudgetSchema = budgetObjectSchema
	.partial()
	.refine(
		(data) =>
			data.startDate === undefined || data.endDate === undefined || data.endDate >= data.startDate,
		{
			path: ['endDate'],
			message: 'Time travel isn\'t supported.'
		}
	)

export type BudgetFormValues = z.infer<typeof budgetObjectSchema>
export type CreateBudgetInput = z.infer<typeof createBudgetSchema>
export type UpdateBudgetInput = z.infer<typeof updateBudgetSchema>

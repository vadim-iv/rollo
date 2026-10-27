import { z } from 'zod';

export const dailySpendingSchema = z.object({
    amount: z
        .string({ error: 'What\'s the damage?' })
        .trim()
        .regex(/^-?\d{1,10}(\.\d{1,2})?$/, 'Please enter a valid number with up to 2 decimal places.')
		.refine((val) => Number(val) > 0, {
			message: 'Nice try. Your budget needs to be above zero.'
		})
		.refine((value) => Number(value) <= 9_999_999.99, "You don't have that much money."),
})

export type DailySpendingInput = z.infer<typeof dailySpendingSchema>
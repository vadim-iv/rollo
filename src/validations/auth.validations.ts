import { z } from 'zod'

export const emailSchema = z.object({
	email: z
		.string({ error: 'We need an email to reach you.' })
		.trim()
		.min(1, 'You forgot your email.')
		.pipe(z.email('That email address looks a little off.'))
})

export const otpSchema = z.object({
	otp: z
		.string({ error: 'The code is kind of important.' })
		.length(6, 'Six digits. Not five, not seven.')
		.regex(/^\d+$/, 'Letters are not invited. Numbers only.')
})

export type EmailInput = z.infer<typeof emailSchema>
export type OtpInput = z.infer<typeof otpSchema>

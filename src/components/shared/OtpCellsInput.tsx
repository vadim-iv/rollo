import { OTPInput } from 'input-otp'
import { isError } from 'node:util'

interface IOtpInput {
	value: string
	onChange: (value: string) => void
	disabled?: boolean
	isError?: boolean
}

export function OtpCellsInput({ value, onChange, disabled, isError }: IOtpInput) {
	return (
		<OTPInput
			value={value}
			onChange={onChange}
			maxLength={6}
			disabled={disabled}
			inputMode='numeric'
			pattern='[0-9]*'
			autoComplete='one-time-code'
			containerClassName='flex items-center gap-0.25 mt-[0.875rem]'
			render={({ slots }) => (
				<>
					{slots.map((slot, index) => (
						<div
							key={index}
							className={`flex items-center justify-center flex-1 h-3.5 max-w-3.5 rounded-2xl border border-border text-primary-text font-semibold transition-colors ${
								isError ? 'border-error' : slot.isActive ? 'border-primary-text' : 'border-border'
							}`}
						>
							{slot.char ?? <span className='h-px w-1 rounded-full bg-border' />}
						</div>
					))}
				</>
			)}
		></OTPInput>
	)
}

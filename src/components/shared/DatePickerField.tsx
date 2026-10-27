import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '../ui/calendar'
import { cn } from 'cn'

interface DatePickerFieldProps {
	value: string
	onChange: (value: string) => void
	placeholder?: string
	invalid?: boolean
}

function parseDate(value: string | undefined): Date | undefined {
	if (!value) return undefined

	const [year, month, day] = value.split('-').map(Number)
	return new Date(year, month - 1, day)
}

function formatDate(date: Date): string {
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')

	return `${year}-${month}-${day}`
}

function formatDisplayDate(date: Date): string {
	return new Intl.DateTimeFormat('en-GB', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	}).format(date)
}

export function DatePickerField({
	value,
	onChange,
	placeholder = 'Pick a date',
	invalid = false
}: DatePickerFieldProps) {
	const selectedDate = parseDate(value)

	return (
		<Popover>
			<PopoverTrigger
				render={
					<Button
						type='button'
						variant='outline'
						aria-invalid={invalid}
						className={cn(
							'relative h-3.5 border flex-1 rounded-[1rem] py-0 pr-0.25 pl-[2.125rem] flex items-center justify-center transition-none',
							invalid ? 'border-error' : 'border-border'
						)}
					/>
				}
			>
				<CalendarIcon strokeWidth={1} className='absolute left-0.75 size-1.25 text-secondary-text' />

				<p className='text-secondary-text font-normal text-sm'>
					{selectedDate ? (
						<span className='text-primary-text'>{formatDisplayDate(selectedDate)}</span>
					) : (
						<span>{placeholder}</span>
					)}
				</p>
			</PopoverTrigger>

			<PopoverContent align='start' className='w-[calc(var(--anchor-width)+var(--anchor-width)+0.5rem)] min-w-0 p-0 shadow-none rounded-xl duration-300'>
				<Calendar
					mode='single'
					selected={selectedDate}
					onSelect={(date) => onChange(date ? formatDate(date) : '')}
					autoFocus
				/>
			</PopoverContent>
		</Popover>
	)
}

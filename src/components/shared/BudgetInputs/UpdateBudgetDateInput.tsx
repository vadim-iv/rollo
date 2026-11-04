import { CreateBudgetInput, UpdateBudgetInput } from '@/validations/budget.validations'
import { motion } from 'motion/react'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import { InputError } from '../InputError'
import { DatePickerField } from '../DatePickerField'

interface IBudgetDateInput {
	control: Control<UpdateBudgetInput>
	errors: FieldErrors<CreateBudgetInput | UpdateBudgetInput>
	delay?: number
}

export function UpdateBudgetDateInput({ control, errors, delay = 0 }: IBudgetDateInput) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 6 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.2, ease: 'easeOut', delay: delay }}
		>
			<label className='font-normal text-primary-text text-base' htmlFor='startDate'>
				Date range
			</label>

			<div className='flex items-center gap-0.5 mt-0.5'>
				<Controller
					control={control}
					name='startDate'
					render={({ field, fieldState }) => (
						<DatePickerField
							value={field.value}
							onChange={field.onChange}
							placeholder='Start date'
							invalid={fieldState.invalid}
						/>
					)}
				/>

				<Controller
					control={control}
					name='endDate'
					render={({ field, fieldState }) => (
						<DatePickerField
							value={field.value}
							onChange={field.onChange}
							placeholder='End date'
							invalid={fieldState.invalid}
						/>
					)}
				/>
			</div>

			<InputError message={errors.startDate?.message || errors.endDate?.message} />
		</motion.div>
	)
}

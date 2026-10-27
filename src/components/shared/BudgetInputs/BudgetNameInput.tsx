import { CreateBudgetInput, UpdateBudgetInput } from '@/validations/budget.validations'
import { motion } from 'motion/react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { InputError } from '../InputError'

interface IBudgetNameInput {
	register: UseFormRegister<CreateBudgetInput | UpdateBudgetInput>
	errors: FieldErrors<CreateBudgetInput | UpdateBudgetInput>
}

export function BudgetNameInput({ register, errors }: IBudgetNameInput) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 6 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.2, ease: 'easeOut' }}
		>
			<label className='font-normal text-primary-text text-base' htmlFor='budgetName'>
				Budget name
			</label>

			<input
				className={`duration-300 mt-0.5 h-3.5 w-full rounded-2xl border px-1.5 text-[1.125rem] font-normal text-primary-text outline-none transition-colors ${
					errors.name ? 'border-error' : 'border-border'
				}`}
				id='budgetName'
				formNoValidate
				type='text'
				autoComplete='off'
				placeholder='e. g. Lisbon trip'
				{...register('name')}
			/>

			<InputError message={errors.name?.message} />
		</motion.div>
	)
}

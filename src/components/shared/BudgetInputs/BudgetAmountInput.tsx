import { CreateBudgetInput, UpdateBudgetInput } from '@/validations/budget.validations'
import { motion } from 'motion/react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { InputError } from '../InputError'
import { currencies } from '@/constants/currencies.constants';

interface IBudgetAmountInput {
	register: UseFormRegister<CreateBudgetInput | UpdateBudgetInput>
	errors: FieldErrors<CreateBudgetInput | UpdateBudgetInput>
	selectedCurrency: string
}

export function BudgetAmountInput({ register, errors, selectedCurrency }: IBudgetAmountInput) {
	const displayCurrency = (currency: string) => {
		const foundCurrency = currencies.find((c) => c.value === currency)
		return foundCurrency?.symbol || foundCurrency?.value || ''
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 6 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.2, ease: 'easeOut' }}
		>
			<label className='font-normal text-primary-text text-base' htmlFor='amount'>
				Total budget
			</label>
			<div
				className={`relative overflow-hidden duration-300 mt-0.5 h-3.5 w-full rounded-2xl border transition-colors ${
					errors.amount ? 'border-error' : 'border-border'
				}`}
			>
				<div className='bg-border text-secondary-text text-base font-normal absolute left-0 top-0 h-full w-4.5 flex items-center justify-center '>
					{displayCurrency(selectedCurrency)}
				</div>
				<input
					className='h-full w-full pr-1.5 pl-6 text-[1.125rem] font-normal text-primary-text outline-none'
					id='amount'
					formNoValidate
					type='text'
					autoComplete='off'
					placeholder='0.00'
					{...register('amount')}
				/>
			</div>

			<InputError message={errors.amount?.message} />
			<p className='font-normal mt-0.5 text-secondary-text text-sm'>
				This amount will be paced across your selected dates
			</p>
		</motion.div>
	)
}

'use client'

import { useCreateBudget } from '@/hooks/budgets/useCreateBudget'
import { CreateBudgetInput, createBudgetSchema } from '@/validations/budget.validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { ActionTextButton } from '../shared/ActionTextButton'
import { BudgetNameInput } from '../shared/BudgetInputs/BudgetNameInput'
import { BudgetAmountInput } from '../shared/BudgetInputs/BudgetAmountInput'
import { CreateBudgetDateInput } from '../shared/BudgetInputs/CreateBudgetDateInput'
import { CreateBudgetCurrencyInput } from '../shared/BudgetInputs/CreateBudgetCurrencyInput'

export function CreateBudgetForm() {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors }
	} = useForm<CreateBudgetInput>({
		resolver: zodResolver(createBudgetSchema),
		defaultValues: {
			name: '',
			amount: '',
			currency: 'EUR',
			startDate: '',
			endDate: ''
		},
		mode: 'onSubmit',
		reValidateMode: 'onChange'
	})

	const selectedCurrency = useWatch({
		control,
		name: 'currency'
	})

	const { createBudget, isCreateBudgetPending } = useCreateBudget()

	const onSubmit = (data: CreateBudgetInput) => {
		// createBudget(data)
		console.log(data)
	}

	return (
		<form
			className='mt-2 flex flex-col gap-2 justify-between flex-1 min-h-0'
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className='flex flex-col gap-1.5 flex-1 min-h-0 overflow-y-auto'>
				<BudgetNameInput register={register} errors={errors} />
				<BudgetAmountInput
					register={register}
					errors={errors}
					selectedCurrency={selectedCurrency}
				/>
				<CreateBudgetDateInput control={control} errors={errors} />
				<CreateBudgetCurrencyInput control={control} errors={errors} />
			</div>
			<ActionTextButton
				text='Create Budget'
				type='submit'
				disabled={isCreateBudgetPending}
				isLoading={isCreateBudgetPending}
			/>
		</form>
	)
}

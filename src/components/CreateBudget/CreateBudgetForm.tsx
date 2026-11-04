'use client'

import { useCreateBudget } from '@/hooks/budgets/useCreateBudget'
import { CreateBudgetInput, createBudgetSchema } from '@/validations/budget.validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { ActionTextButton } from '../shared/ActionTextButton'
import { CreateBudgetNameInput } from '../shared/BudgetInputs/CreateBudgetNameInput'
import { CreateBudgetAmountInput } from '../shared/BudgetInputs/CreateBudgetAmountInput'
import { CreateBudgetDateInput } from '../shared/BudgetInputs/CreateBudgetDateInput'
import { CreateBudgetCurrencyInput } from '../shared/BudgetInputs/CreateBudgetCurrencyInput'
import { useRouter } from 'next/navigation'
import { PAGES } from '@/config/pages.config'

export function CreateBudgetForm() {
	const router = useRouter()

	const {
		register,
		handleSubmit,
		control,
		formState: { errors, dirtyFields }
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

	const allFieldsAreDirty = (['name', 'amount', 'currency', 'startDate', 'endDate'] as const).every(
		(field) => dirtyFields[field]
	)

	const selectedCurrency = useWatch({
		control,
		name: 'currency'
	})

	const { createBudget, isCreateBudgetPending } = useCreateBudget()

	const onSubmit = (data: CreateBudgetInput) => {
		createBudget(data, {
			onSuccess: () => {
				router.push(PAGES.BUDGETS)
			}
		})
	}

	return (
		<form
			className='mt-2 flex flex-col gap-2 justify-between flex-1 min-h-0'
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className='flex flex-col gap-1.5 flex-1 min-h-0 overflow-y-auto'>
				<CreateBudgetNameInput register={register} errors={errors} delay={0} />
				<CreateBudgetAmountInput
					register={register}
					errors={errors}
					selectedCurrency={selectedCurrency}
					delay={0.05}
				/>
				<CreateBudgetDateInput control={control} errors={errors} delay={0.1} />
				<CreateBudgetCurrencyInput control={control} errors={errors} delay={0.15} />
			</div>
			<ActionTextButton
				text='Create Budget'
				type='submit'
				disabled={isCreateBudgetPending}
				isLoading={isCreateBudgetPending}
				isDirty={allFieldsAreDirty}
			/>
		</form>
	)
}

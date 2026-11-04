'use client'

import { UpdateBudgetInput, updateBudgetSchema } from '@/validations/budget.validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { ActionTextButton } from '../shared/ActionTextButton'
import { UpdateBudgetNameInput } from '../shared/BudgetInputs/UpdateBudgetNameInput'
import { UpdateBudgetAmountInput } from '../shared/BudgetInputs/UpdateBudgetAmountInput'
import { useRouter } from 'next/navigation';
import { PAGES } from '@/config/pages.config';
import { useUpdateBudget } from '@/hooks/budgets/useUpdateBudget';
import { UpdateBudgetCurrencyInput } from '../shared/BudgetInputs/UpdateBudgetCurrencyInput';
import { UpdateBudgetDateInput } from '../shared/BudgetInputs/UpdateBudgetDateInput';
import { useInitialBudgetData } from '@/hooks/budgets/useInitialBudgetData';

interface IEditBudgetForm {
    budgetId: string
}

export function EditBudgetForm({ budgetId }: IEditBudgetForm) {
    const router = useRouter()

	const {
		register,
        reset,
		handleSubmit,
		control,
		formState: { errors }
	} = useForm<UpdateBudgetInput>({
		resolver: zodResolver(updateBudgetSchema),
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

	const { updateBudget, isUpdateBudgetPending } = useUpdateBudget(budgetId)
    const { isInitialDataLoading } = useInitialBudgetData(budgetId, reset)

	const onSubmit = (data: UpdateBudgetInput) => {
		updateBudget(data, {
            onSuccess: () => {
                router.push(PAGES.getBudgetUrl(budgetId))
            }
        })
	}

	return (
		<form
			className='mt-2 flex flex-col gap-2 justify-between flex-1 min-h-0'
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className='flex flex-col gap-1.5 flex-1 min-h-0 overflow-y-auto'>
				<UpdateBudgetNameInput register={register} errors={errors} delay={0}/>
				<UpdateBudgetAmountInput
					register={register}
					errors={errors}
					selectedCurrency={selectedCurrency || 'EUR'}
					delay={0.05}
				/>
				<UpdateBudgetDateInput control={control} errors={errors} delay={0.1} />
				<UpdateBudgetCurrencyInput control={control} errors={errors} delay={0.15} />
			</div>
			<ActionTextButton
				text='Update Budget'
				type='submit'
				disabled={isUpdateBudgetPending || isInitialDataLoading}
				isLoading={isUpdateBudgetPending}
			/>
		</form>
	)
}

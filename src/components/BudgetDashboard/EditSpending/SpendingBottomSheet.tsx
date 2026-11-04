'use client'

import { currencies } from '@/constants/currencies.constants'
import { DailySpendingInput, dailySpendingSchema } from '@/validations/daily-spending.validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { InputError } from '@/components/shared/InputError'
import { ActionTextButton } from '@/components/shared/ActionTextButton'
import { useSaveSpending } from '@/hooks/budgets/spendings/useSaveSpending'
import { useInitialSpendingData } from '@/hooks/budgets/spendings/useInitialSpendingData'
import { useEffect } from 'react'

interface ISpendingBottomSheet {
	budgetId: string
	date?: string
	currency: string
	setIsBottomSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function SpendingBottomSheet({
	budgetId,
	date,
	currency,
	setIsBottomSheetOpen
}: ISpendingBottomSheet) {
	const displayCurrency = currencies.find((c) => c.value === currency)?.symbol || currency
	const toEditDate = date || new Date()
	const isToday = new Date(toEditDate).toDateString() === new Date().toDateString()

	const displayDate = Intl.DateTimeFormat('en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	}).format(new Date(toEditDate))

	const {
		reset,
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<DailySpendingInput>({
		resolver: zodResolver(dailySpendingSchema),
		defaultValues: {
			amount: ''
		},
		mode: 'onSubmit',
		reValidateMode: 'onChange'
	})

	const { isCalculatedBudgetLoading } = useInitialSpendingData(
		budgetId,
		date || new Date().toISOString().split('T')[0],
		reset,
	)

	const { saveSpending, isSaveSpendingPending } = useSaveSpending(
		budgetId,
		date || new Date().toISOString().split('T')[0]
	)

	const onSubmit = (data: DailySpendingInput) => {
		saveSpending(data, {
			onSuccess: () => setIsBottomSheetOpen(false)
		})
	}

	return (
		<div className='fixed inset-0 z-50 flex flex-col justify-end items-center'>
			<motion.div
				className='absolute inset-0 bg-black/25 z-50'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.3, ease: 'easeInOut' }}
				onClick={() => setIsBottomSheetOpen(false)}
			/>
			<motion.div
				className='bg-surface z-60 w-full max-h-30 h-full rounded-t-4xl border border-border border-b-0 px-2 pt-3 pb-4 flex flex-col justify-between'
				initial={{ y: '100%' }}
				animate={{ y: 0 }}
				exit={{ y: '100%' }}
				transition={{ duration: 0.3, ease: 'easeInOut' }}
			>
				<div className='fixed bg-surface h-dvh top-full left-0 right-0' />
				<div>
					<p className='text-2xl font-semibold text-primary-text'>Edit Spending</p>
					<p className='mt-0.25 text-secondary-text text-base font-semibold'>
						{!date || isToday ? 'Today  • ' + displayDate : displayDate}
					</p>

					<form id='spending-form' onSubmit={handleSubmit(onSubmit)} className='mt-1.5'>
						<motion.div
							initial={{ opacity: 0, y: 6 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.2, ease: 'easeOut' }}
						>
							<label className='font-normal text-primary-text text-base' htmlFor='amount'>
								Amount spent
							</label>
							<div
								className={`relative overflow-hidden duration-300 mt-0.5 h-3.5 w-full rounded-2xl border transition-colors ${
									errors.amount ? 'border-error' : 'border-border'
								}`}
							>
								<div className='bg-border text-secondary-text text-base font-normal absolute left-0 top-0 h-full w-4.5 flex items-center justify-center '>
									{displayCurrency}
								</div>
								<input
									className='h-full w-full pr-1.5 pl-6 text-[1.125rem] font-normal text-primary-text outline-none'
									id='amount'
									formNoValidate
									type='text'
									autoComplete='off'
									placeholder='0.00'
									disabled={isSaveSpendingPending}
									{...register('amount', {
										onChange: (e) => {
											console.log('onChange:', e.target.value)
										}
									})}
								/>
							</div>

							<InputError message={errors.amount?.message} />
						</motion.div>
					</form>
				</div>

				<ActionTextButton
					form='spending-form'
					type='submit'
					text='Save changes'
					isLoading={isSaveSpendingPending || isCalculatedBudgetLoading}
				/>
			</motion.div>
		</div>
	)
}

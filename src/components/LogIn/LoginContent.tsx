'use client'

import { useLogIn } from '@/hooks/auth/useLogIn'
import { useSendOtp } from '@/hooks/auth/useSendOtp'
import { EmailInput, emailSchema, OtpInput, otpSchema } from '@/validations/auth.validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ActionTextButton } from '../shared/ActionTextButton'
import { OtpCellsInput } from '../shared/OtpCellsInput'
import { useRouter } from 'next/navigation'
import { PAGES } from '@/config/pages.config'
import { InputError } from '../shared/InputError'
import { AnimatePresence, motion } from 'motion/react'
import { Lock } from 'lucide-react'
import Image from 'next/image'
import { isAuthError } from '@neondatabase/auth'
import { toast } from 'sonner'

export function LoginContent() {
	const [retrySeconds, setRetrySeconds] = useState(30)
	const [step, setStep] = useState<'email' | 'otp'>('email')
	const [submittedEmail, setSubmittedEmail] = useState('')
	const router = useRouter()

	const emailForm = useForm<EmailInput>({
		resolver: zodResolver(emailSchema),
		defaultValues: {
			email: ''
		},
		mode: 'onSubmit',
		reValidateMode: 'onChange'
	})

	const otpForm = useForm<OtpInput>({
		resolver: zodResolver(otpSchema),
		defaultValues: {
			otp: ''
		},
		mode: 'onSubmit',
		reValidateMode: 'onChange'
	})

	const { sendOtp, isSendingOtp } = useSendOtp()
	const { logIn, isLoggingIn } = useLogIn()

	const onEmailSubmit = (data: EmailInput) => {
		sendOtp(data.email, {
			onSuccess: () => {
				setSubmittedEmail(data.email)
				setStep('otp')
				setRetrySeconds(30)
				otpForm.reset({ otp: '' })
			}
		})
	}

	const onOtpSubmit = (data: OtpInput) => {
		logIn(
			{ email: submittedEmail, otp: data.otp },
			{
				onSuccess: () => {
					router.push(PAGES.BUDGETS)
				},
				onError: (error) => {
					if (!isAuthError(error)) {
						toast.error("Well, that wasn't supposed to happen. Try again.")
						return
					}
					if (error.status === 400) {
						otpForm.setError('otp', {
							type: 'server',
							message: "That code isn't doing its job. Try again."
						})
						return
					}

					if (error.status === 429) {
						otpForm.setError('otp', {
							type: 'server',
							message: 'Easy there, speedrunner. Give it a moment.'
						})
						return
					}

					toast.error('Something went sideways. Try again in a bit.')
				}
			}
		)
	}

	useEffect(() => {
		if (step !== 'otp' || retrySeconds === 0) return

		const timer = setInterval(() => {
			setRetrySeconds((seconds) => Math.max(0, seconds - 1))
		}, 1000)

		return () => clearInterval(timer)
	}, [step, retrySeconds])

	const onRetry = () => {
		otpForm.reset({ otp: '' })
		setStep('email')
	}

	return (
		<>
			<motion.div
				className='fixed left-1/2 z-50'
				initial={{
					top: '50%',
					x: '-50%',
					y: '-50%'
				}}
				animate={{
					top: 'calc(10dvh)',
					x: '-50%',
					y: 0
				}}
				transition={{
					delay: 2,
					duration: 1,
					ease: [0.4, 0, 0.35, 1]
				}}
			>
				<Image
					src='/logo.svg'
					alt='Rollo Logo'
					width={100}
					height={100}
					className='size-6'
					priority
				/>
			</motion.div>

			<motion.div
				className='flex flex-col h-[75dvh] shadow-box-up border border-border absolute -bottom-6 -left-3 -right-3 bg-surface px-3 py-6 rounded-t-4xl'
				initial={{ y: '100dvh' }}
				animate={{ y: 0 }}
				transition={{
					delay: 2,
					duration: 1,
					ease: [0.1, 0, 0.2, 1]
				}}
			>
				<h1 className='font-semibold text-primary-text text-[2rem]'>
					Welcome to <span className='text-accent'>Rollo</span>
				</h1>

				<div className='flex flex-col justify-between flex-1'>
					<AnimatePresence mode='wait' initial={false}>
						{step === 'email' ? (
							<motion.form
								key='email'
								id='email-form'
								className='mt-3'
								onSubmit={emailForm.handleSubmit(onEmailSubmit)}
								initial={{ opacity: 0, y: 6 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -6 }}
								transition={{ duration: 0.2, ease: 'easeOut' }}
							>
								<label className='font-normal text-secondary-text text-[1.125rem]' htmlFor='email'>
									Enter your email to continue
								</label>

								<input
									className={`duration-300 mt-[0.875rem] h-3.5 w-full rounded-2xl border px-1.5 text-[1.125rem] font-normal text-primary-text outline-none transition-colors ${
										emailForm.formState.errors.email ? 'border-error' : 'border-border'
									}`}
									id='email'
                                    formNoValidate
									type='email'
									autoComplete='email'
									placeholder='email@example.com'
									{...emailForm.register('email')}
								/>

								<InputError message={emailForm.formState.errors.email?.message} />
							</motion.form>
						) : (
							<motion.form
								key='otp'
								id='otp-form'
								className='mt-3'
								onSubmit={otpForm.handleSubmit(onOtpSubmit)}
								initial={{ opacity: 0, y: 6 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -6 }}
								transition={{ duration: 0.2, ease: 'easeOut' }}
							>
								<label className='font-normal text-secondary-text text-[1.125rem]' htmlFor='otp'>
									Enter the code sent to your email
								</label>

								<OtpCellsInput
									value={otpForm.watch('otp')}
									onChange={(value) => {
										otpForm.setValue('otp', value, {
											shouldValidate: otpForm.formState.isSubmitted,
											shouldDirty: true
										})
									}}
									disabled={isLoggingIn}
									isError={!!otpForm.formState.errors.otp}
								/>

								<InputError message={otpForm.formState.errors.otp?.message} />

								<button
									type='button'
									onClick={onRetry}
									disabled={retrySeconds > 0 || isLoggingIn}
									className='mt-2 text-sm text-secondary-text transition-colors enabled:hover:text-primary-text disabled:cursor-not-allowed disabled:opacity-60'
								>
									{retrySeconds > 0
										? `Try another email in 00:${String(retrySeconds).padStart(2, '0')}`
										: 'Try another email'}
								</button>
							</motion.form>
						)}
					</AnimatePresence>

					<div className='flex flex-col items-center gap-0.75'>
						<div className='flex items-center gap-0.25'>
							<Lock className='size-[0.875rem] text-secondary-text' />
							<p className='text-xs font-normal text-secondary-text'>
								We'll never share your email with anyone
							</p>
						</div>
						<ActionTextButton
							type='submit'
							form={step === 'email' ? 'email-form' : 'otp-form'}
							disabled={isSendingOtp || isLoggingIn}
							isLoading={isSendingOtp || isLoggingIn}
							text={step === 'email' ? 'Send code' : 'Join'}
						/>
					</div>
				</div>
			</motion.div>
		</>
	)
}

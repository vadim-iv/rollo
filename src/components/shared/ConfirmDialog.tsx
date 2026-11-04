'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image';
import { useEffect } from 'react'

interface IConfirmDialog {
	open: boolean
	onOpenChange: (open: boolean) => void
	title: string
	description: string
	confirmText?: string
	isLoading?: boolean
	onConfirm: () => void
}

export function ConfirmDialog({
	open,
	onOpenChange,
	title,
	description,
	confirmText = 'Confirm',
	isLoading = false,
	onConfirm
}: IConfirmDialog) {
	useEffect(() => {
		if (!open) return

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && !isLoading) onOpenChange(false)
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [isLoading, onOpenChange, open])

	return (
		<AnimatePresence>
			{open && (
				<motion.div
					className='fixed inset-0 z-70 flex items-center justify-center bg-primary-text/30 px-2'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2, ease: 'easeOut' }}
					onClick={() => {
						if (!isLoading) onOpenChange(false)
					}}
					role='presentation'
				>
					<motion.div
						className='w-full overflow-hidden rounded-2xl border border-border bg-surface text-primary-text'
						style={{ maxWidth: 'calc(var(--container-xl) - 4rem)' }}
						initial={{ opacity: 0, y: 10, scale: 0.96 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 6, scale: 0.96 }}
						transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
						onClick={(event) => event.stopPropagation()}
						role='alertdialog'
						aria-modal='true'
						aria-labelledby='confirm-dialog-title'
						aria-describedby='confirm-dialog-description'
					>
						<div className='flex flex-col text-center items-center gap-1 p-2'>
							<div>
								<h2 id='confirm-dialog-title' className='text-xl font-semibold'>
									{title}
								</h2>
								<p
									id='confirm-dialog-description'
									className='mt-0.5 text-base leading-snug text-secondary-text'
								>
									{description}
								</p>
							</div>
							<div className='flex flex-col gap-0.5 w-full mt-0.5'>
								<button
									type='button'
									className='h-2.5 rounded-lg text-base font-semibold transition-[colors_opacity] duration-200 bg-border/50 hover:bg-border/75 text-primary-text disabled:cursor-not-allowed disabled:opacity-75'
									onClick={() => onOpenChange(false)}
									disabled={isLoading}
								>
									Cancel
								</button>
								<button
									type='button'
									className='h-2.5 rounded-lg flex items-center justify-center bg-error text-base font-semibold text-surface transition-[colors_opacity] duration-200 hover:bg-error/85 disabled:cursor-not-allowed disabled:opacity-75'
									onClick={onConfirm}
									disabled={isLoading}
								>
									{isLoading ? (
                                        <Image 
                                            src='/spinner-double.svg'
                                            alt='Loading'
                                            width={20}
                                            height={20}
                                            className='h-full'
                                        />
                                    ) : confirmText}
								</button>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

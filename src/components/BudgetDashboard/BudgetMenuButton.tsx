'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { EllipsisVertical } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { PAGES } from '@/config/pages.config'
import { useDeleteBudget } from '@/hooks/budgets/useDeleteBudget'
import { ConfirmDialog } from '@/components/shared/ConfirmDialog'

interface IBudgetMenuButton {
	budgetId: string
}

export function BudgetMenuButton({ budgetId }: IBudgetMenuButton) {
	const router = useRouter()
	const menuRef = useRef<HTMLDivElement>(null)
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
	const { deleteBudget, isDeleteBudgetPending } = useDeleteBudget(budgetId)

	useEffect(() => {
		if (!isMenuOpen) return

		const handlePointerDown = (event: PointerEvent) => {
			if (!menuRef.current?.contains(event.target as Node)) setIsMenuOpen(false)
		}
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setIsMenuOpen(false)
		}

		document.addEventListener('pointerdown', handlePointerDown)
		document.addEventListener('keydown', handleKeyDown)
		return () => {
			document.removeEventListener('pointerdown', handlePointerDown)
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [isMenuOpen])

    const handleDeleteBudget = () => {
        deleteBudget(undefined, {
            onSuccess: () => {
                router.push(PAGES.BUDGETS)
            }
        })
    }

	return (
		<>
			<div ref={menuRef} className='absolute right-0 top-1/2 z-10 -translate-y-1/2'>
				<button
					type='button'
					className='flex size-2 items-center justify-center rounded-full'
					aria-label='Budget actions'
					aria-expanded={isMenuOpen}
					aria-haspopup='menu'
					onClick={() => setIsMenuOpen((open) => !open)}
				>
					<EllipsisVertical className='absolute right-0 size-2 mr-[-0.70rem]' />
				</button>

				<AnimatePresence>
					{isMenuOpen && (
						<motion.div
							className='absolute right-0 top-full mt-1 w-[calc(100vw-4rem)] rounded-2xl border border-border bg-surface p-0.25 text-base font-medium flex flex-col gap-0.25'
							style={{ maxWidth: 'calc(var(--container-xl) - 4rem)' }}
							initial={{ opacity: 0, y: -4, scale: 0.96 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: -4, scale: 0.96 }}
							transition={{ duration: 0.1, ease: 'easeOut' }}
							role='menu'
						>
							<button
								type='button'
								className='w-full rounded-t-xl rounded-b-sm bg-border/50 px-1 py-0.5 text-left text-base font-semibold text-primary-text transition-colors duration-300 hover:bg-border/75'
								onClick={() => {
									setIsMenuOpen(false)
									router.push(PAGES.getEditBudgetUrl(budgetId))
								}}
								role='menuitem'
							>
								Edit budget
							</button>
							<button
								type='button'
								className='w-full rounded-b-xl rounded-t-sm bg-error/10 px-1 py-0.5 text-left text-base font-semibold text-error transition-colors duration-300 hover:bg-error/20'
								onClick={() => {
									setIsMenuOpen(false)
									setIsDeleteDialogOpen(true)
								}}
								role='menuitem'
							>
								Delete budget
							</button>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			<ConfirmDialog
				open={isDeleteDialogOpen}
				onOpenChange={setIsDeleteDialogOpen}
				title='Time to let it go?'
				description="Once it's gone, it's gone. All spending records will disappear with it. No take-backs!"
				confirmText='Delete budget'
				isLoading={isDeleteBudgetPending}
				onConfirm={handleDeleteBudget}
			/>
		</>
	)
}

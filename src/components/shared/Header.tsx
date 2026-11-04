'use client'

import { PAGES } from '@/config/pages.config'
import { useLogOut } from '@/hooks/auth/useLogOut'
import { LogOut } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner';

export function Header() {
	const { logOut } = useLogOut()
	const router = useRouter()

	const handleLogOut = () => {
		const toastId = toast.loading('Logging out...')

		logOut(undefined, {
			onSuccess: () => {
				toast.success('Logged out.', { id: toastId })
				router.replace(PAGES.LOGIN)
				router.refresh()
			},
			onError: () => {
				toast.error('Could not log out. Try again.', { id: toastId })
			}
		})
	}
	return (
		<div className='flex justify-between items-center'>
			<div className='flex items-center gap-0.5'>
				<Image src='/logo.svg' alt='Rollo Logo' width={32} height={32} className='size-1.5' />

				<h4 className='font-semibold text-xl text-primary-text'>Rollo</h4>
			</div>

			<button
				type='button'
				className='text-primary-text size-1.5 cursor-pointer'
				onClick={handleLogOut}
			>
				<LogOut />
			</button>
		</div>
	)
}

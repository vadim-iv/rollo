import { LogOut } from 'lucide-react'
import Image from 'next/image'

export function Header() {
	return (
		<div className='flex justify-between items-center'>
			<div className='flex items-center gap-0.5'>
				<Image src='/logo.svg' alt='Rollo Logo' width={32} height={32} className='size-1.5' />

				<h4 className='font-semibold text-xl text-primary-text'>Rollo</h4>
			</div>

			<LogOut className='text-primary-text size-1.5 cursor-pointer' />
		</div>
	)
}

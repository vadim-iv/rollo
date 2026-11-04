import { LoginContent } from '@/components'
import { auth } from '@/lib/auth/server'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { connection } from 'next/server'
import { Suspense } from 'react';

export const metadata: Metadata = {
	title: 'Log in',
	description: 'Log in to Rollo to manage your budgets and know what you can spend each day.'
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginSuspenseContent />
    </Suspense>
  )
}

async function LoginSuspenseContent() {
	await connection()
	const { data: session } = await auth.getSession()

	if (session?.user) {
		redirect('/')
	}
	return (
		<div className='h-full flex flex-col items-center justify-end relative'>
			<div className='text-center max-w-14 w-full'>
				<h2 className='font-semibold text-2xl text-primary-text'>Rollo</h2>
				<p className='mt-0.5 font-normal text-base text-secondary-text'>
					Know what you can spend today.
				</p>
			</div>

			<LoginContent />
		</div>
	)
}

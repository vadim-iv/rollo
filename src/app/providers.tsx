'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'

export function Providers({ children }: PropsWithChildren) {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false
			}
		}
	})

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
			<Toaster
				position='top-center'
				richColors
				toastOptions={{
					classNames: {
						toast: '!rounded-xl !top-1',
						title: '!text-base !font-semibold !text-primary-text',
						description: '!text-sm !text-secondary-text',
						success: '!border-accent/50 !text-accent !bg-[#f6fffb]',
						error: '!border-error/50 !text-error !bg-[#fff1f0]',
						loading: '!border-border !text-border !bg-surface'
					}
				}}
			/>
		</QueryClientProvider>
	)
}

import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { cn } from '@/lib/utils'

const manrope = Manrope({
	variable: '--font-sans',
	subsets: ['latin'],
	weight: ['400', '500', '600', '700', '800']
})

export const metadata: Metadata = {
	title: {
		default: 'Rollo',
		template: '%s | Rollo'
	},
	description:
		'Rollo helps you manage your budget day by day. See how much you can spend today, track your spending, and carry unused money forward to future days.',
	applicationName: 'Rollo',
	appleWebApp: {
		capable: true,
		statusBarStyle: 'default',
		title: 'Rollo'
	}
}

export const viewport: Viewport = {
	themeColor: '#F7F6F2',
	viewportFit: 'cover',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
	return (
		<html lang='en' className={cn('h-full bg-background', manrope.variable, 'font-sans')}>
			<body className='h-dvh max-h-dvh min-h-dvh border border-black overscroll-none overflow-y-hidden m-0 bg-background flex justify-center font-sans'>
				<Providers>
					<div className='max-w-xl w-full h-full bg-background pt-5 pb-4 px-2'>{children}</div>
				</Providers>
			</body>
		</html>
	)
}

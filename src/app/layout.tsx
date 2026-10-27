import type { Metadata } from 'next'
import { Manrope, Geist } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { cn } from "@/lib/utils";

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
		'Rollo helps you manage your budget day by day. See how much you can spend today, track your spending, and carry unused money forward to future days.'
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
	return (
		<html lang='en' className={cn("h-full", manrope.variable, "font-sans")}>
			<body className='h-dvh m-0 bg-black flex justify-center font-sans'>
				<Providers>
					<div className='max-w-xl w-full h-full bg-background pt-5 pb-6 px-3'>{children}</div>
				</Providers>
			</body>
		</html>
	)
}

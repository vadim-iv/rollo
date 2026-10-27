import Link from 'next/link'

interface ILinkTextButtonProps {
	text: string
	href: string
}

export function LinkTextButton({ text, href }: ILinkTextButtonProps) {
	return (
		<Link
			href={href}
			className='h-3.5 w-full bg-accent hover:bg-accent-dark transition-colors duration-300 rounded-2xl text-surface text-xl font-semibold flex items-center justify-center outline-0 ring-0'
		>
			{text}
		</Link>
	)
}

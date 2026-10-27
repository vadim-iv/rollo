import Image from "next/image";

interface IActionTextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	text: string
	isLoading?: boolean
}

export function ActionTextButton({
	text,
	isLoading,
	type = 'button',
	...props
}: IActionTextButtonProps) {
	return (
		<button
			{...props}
			type={type}
			className='h-3.5 w-full bg-accent hover:bg-accent-dark transition-colors duration-300 rounded-2xl text-surface text-xl font-semibold flex items-center justify-center outline-0 ring-0'
		>
			{isLoading ? (
				<Image 
					src="/spinner-double.svg"
					alt="Loading"
					width={24}
					height={24}
					className="size-2"
				/>
			) : (
				<p>{text}</p>
			)}
		</button>
	)
}

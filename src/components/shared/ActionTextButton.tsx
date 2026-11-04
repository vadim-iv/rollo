import { cn } from "@/lib/utils";
import Image from "next/image";

interface IActionTextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	text: string
	isLoading?: boolean
	className?: string
}

export function ActionTextButton({
	text,
	isLoading,
	className,
	type = 'button',
	...props
}: IActionTextButtonProps) {
	return (
		<button
			{...props}
			type={type}
			className={
				cn(
					'h-3.5 w-full bg-accent hover:bg-accent-dark transition-colors duration-300 rounded-2xl text-surface text-xl font-semibold flex items-center justify-center outline-0 ring-0',
					className
				)
			}
			disabled={isLoading}
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

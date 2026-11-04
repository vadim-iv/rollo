import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Image from "next/image";

interface IActionTextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	text: string
	isLoading?: boolean
	className?: string
    icon: LucideIcon
}

export function ActionTextIconButton({
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
					'h-2.5 w-full bg-accent hover:bg-accent-dark transition-colors duration-300 rounded-xl text-surface text-xl font-semibold flex items-center justify-center outline-0 ring-0',
					className
				)
			}
		>
				<div className="flex items-center justify-center gap-0.5">
                    <props.icon className="size-[1.125rem] text-surface" />
                    <p className="text-base text-surface font-semibold">{text}</p>
                </div>
		</button>
	)
}

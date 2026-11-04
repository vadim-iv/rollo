'use client'

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface INavBackChevron { 
	path: string
}

export function NavBackChevron({ path }: INavBackChevron) {
    const router = useRouter()

	return (
		<button
			type='button'
			onClick={() => router.push(path)}
			aria-label='Go back'
			className='absolute left-0'
		>
			<ChevronLeft className='size-2 ml-[-0.70rem]'/>
		</button>
	)
}

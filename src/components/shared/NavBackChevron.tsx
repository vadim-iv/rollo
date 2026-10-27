'use client'

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function NavBackChevron() {
    const router = useRouter()

	return (
		<button
			type='button'
			onClick={() => router.back()}
			aria-label='Go back'
			className='absolute left-0'
		>
			<ChevronLeft className='size-2 ml-[-0.70rem]'/>
		</button>
	)
}

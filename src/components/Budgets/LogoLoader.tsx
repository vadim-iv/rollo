import { motion } from 'motion/react'
import Image from 'next/image'

interface ILogoLoaderProps {
	isLoading: boolean
}

export function LogoLoader({ isLoading }: ILogoLoaderProps) {
	return (
		<motion.div
			initial={{ x: 0 }}
			animate={isLoading ? { y: [0, -4, -6, -4, 0] } : { y: 0 }}
			transition={
				isLoading
					? {
							duration: 0.7,
							repeat: Infinity,
							repeatType: 'reverse',
							ease: 'linear'
						}
					: { duration: 0.2, ease: 'easeOut' }
			}
		>
			<Image className='size-5' src='/logo.svg' alt='Logo' width={100} height={100} />
		</motion.div>
	)
}

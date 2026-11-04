'use client'

import { motion, useAnimationControls } from 'motion/react'
import Image from 'next/image'
import { useEffect } from 'react'

interface ILogoLoaderProps {
	isLoading: boolean
}

export function LogoLoader({ isLoading }: ILogoLoaderProps) {
	const controls = useAnimationControls()

	useEffect(() => {
		if (isLoading) {
			controls.start({
				y: [0, -4, -6, -4, 0],
				transition: {
					duration: 0.7,
					repeat: Infinity,
					ease: 'linear'
				}
			})
		} else {
			controls.stop()
			controls.start({
				y: 0,
				transition: {
					duration: 0.2,
					ease: 'easeOut'
				}
			})
		}

		return () => controls.stop()
	}, [controls, isLoading])

	return (
		<motion.div
			initial={{ y: 0 }}
			animate={controls}
		>
			<Image className='size-5' src='/logo.svg' alt='Logo' width={100} height={100} />
		</motion.div>
	)
}

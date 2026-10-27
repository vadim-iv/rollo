import { AnimatePresence, motion } from 'motion/react'

interface IInputError {
    message?: string
}

export function InputError({ message }: IInputError) {
	return <AnimatePresence mode='wait'>
        {
            message && (
                <motion.p
                    key={message}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className='mt-0.5 text-sm text-error'
                >
                    {message}
                </motion.p>
            )
        }
    </AnimatePresence>
}

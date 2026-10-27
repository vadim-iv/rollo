import { authService } from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'

export function useSendOtp() {
	const {
		mutate: sendOtp,
		isPending: isSendingOtp,
		isError: isErrorOtp
	} = useMutation({
		mutationKey: ['send-otp'],
		mutationFn: (email: string) => authService.sendOTP(email)
	})

	return { sendOtp, isSendingOtp, isErrorOtp }
}

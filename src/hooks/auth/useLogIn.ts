import { authService } from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'

export function useLogIn() {
	const {
		mutate: logIn,
		isPending: isLoggingIn,
		isError: isErrorLogin
	} = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: { email: string; otp: string }) => authService.login(data.email, data.otp)
	})
	return { logIn, isLoggingIn, isErrorLogin }
}

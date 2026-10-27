import { authService } from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'

export function useLogOut() {
	const {
		mutate: logOut,
		isPending: isLoggingOut,
		isError: isErrorLogout
	} = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout()
	})

	return { logOut, isLoggingOut, isErrorLogout }
}

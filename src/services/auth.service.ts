import { authClient } from '@/lib/auth/client'

class AuthService {
	async sendOTP(email: string) {
		return authClient.emailOtp.sendVerificationOtp({
			email,
			type: 'sign-in'
		})
	}

	async login(email: string, otp: string) {
		return authClient.signIn.emailOtp({
			email,
			otp
		})
	}

	async logout() {
		return authClient.signOut()
	}

	async getSession() {
		return authClient.getSession()
	}
}

export const authService = new AuthService()

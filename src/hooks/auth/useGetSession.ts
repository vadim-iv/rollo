import { authService } from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";

export function useGetSession() {
    const { data: session, isLoading: isLoadingSession, isError: isErrorSession } = useQuery({
        queryKey: ['session'],
        queryFn: () => authService.getSession()
    })

	return { session, isErrorSession, isLoadingSession }
}

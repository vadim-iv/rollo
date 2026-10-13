import { auth } from "./auth/server";

export async function getAuthUser() {
    const { data } = await auth.getSession()

    if(!data?.user?.id) return null

    return data.user
 }
'use server'

import { signUp } from "@/lib/auth/auth-service"

export async function post(body: any) {
    const session = await signUp(body);
    return session;
}
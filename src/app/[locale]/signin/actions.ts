'use server'

import { signIn } from "@/lib/auth/auth-service";

export async function post(body: any) {
    try {
        const session = await signIn(body);
        return session;
    } catch (e) {
        throw e
    }
}
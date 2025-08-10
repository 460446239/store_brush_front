'use server'

import { signOut } from "@/lib/auth/auth-service";
import { redirect } from "next/navigation";

export async function signout() {
    await signOut();
    redirect("/")
}
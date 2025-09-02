import { routing } from "@/i18n/routing";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getRealPathname = (pathname: string) => {
    const segments = pathname.split('/')
    // @ts-ignore
                             .filter((item) => Boolean(item) && !routing.locales.includes(item));
    return '/' + segments.join('/');
}

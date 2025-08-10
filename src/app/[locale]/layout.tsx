import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { hasLocale } from "use-intl";
import { notFound } from "next/navigation";
import {routing} from '@/i18n/routing';
import { NextIntlClientProvider } from "next-intl";
import Providers from "./providers";
import { Toaster } from 'sonner';
import { getUser } from "@/lib/auth/server";
import "@/app/globals.css";
import { AuthProvider } from "@/lib/auth/context";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        absolute: 'Brush',
        template: '%s | Brush'
    },
    description: "",
};

export default async function RootLayout({
    children,
    params
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{locale: string}>;
}>) {
    const {locale} = await params;
    const user = await getUser();
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }
    return (
        <html lang={locale}>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <NextIntlClientProvider>
                    <Providers>
                        <AuthProvider initialUser={user}>
                            {children}
                        </AuthProvider>
                        <Toaster richColors />
                    </Providers>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}

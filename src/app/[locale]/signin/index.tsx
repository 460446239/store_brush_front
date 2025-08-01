'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useRouter } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslations } from "use-intl";
import { z } from "zod"
import { toast } from "sonner";
import { post } from "./actions";
import { useSearchParams } from "next/navigation";

const schema = z.object({
    account: z.email(),
    password: z.string()
        .min(6)
        .max(32)
});

export const SignInForm = () => {
    const t = useTranslations();
    const search = useSearchParams();
    const router = useRouter();
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: {
            account: '',
            password: '',
        }
    });

    const onSubmit = async (data: z.infer<typeof schema>) => {
        try {
            await post(data);
            const redirect = search.get('redirect');
            if (redirect) {
                router.replace(redirect);
            }
        } catch (e: any) {
            toast.error(e.message);
        }
    }

    return <Form className="flex flex-col gap-6" form={form} onSubmit={onSubmit}>
        <FormField name="account"
            label={t('account')}
            reqired>
            <Input placeholder="xxx@example.com" />
        </FormField>
        <FormField name="password"
            label={<div className="flex justify-between w-full">
                {t('password')}
                <Link href="/forgot" replace prefetch className="font-normal text-xs text-foreground hover:text-primary">{t('forgot_password')}</Link>
            </div>}
            reqired>
            <Input type="password" placeholder={t('placeholder.input', { field: t('password').toLowerCase() })} />
        </FormField>
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            { form.formState.isSubmitting ?  <Loader2Icon className="animate-spin" /> : null }
            {t('signin')}
        </Button>
        <div className="mt-4 text-center text-sm">
            {t('no_account')}
            <Link replace prefetch href="/signup" className="underline underline-offset-4 ml-2 hover:text-primary">
                {t('signup')}
            </Link>
        </div>
    </Form>
}

const SignIn = () => {
    const t = useTranslations();
    return <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
            <div className="flex flex-col gap-6">
                <Card className="overflow-hidden p-0">
                    <CardContent className="grid p-0 md:grid-cols-2">
                        <div className="p-6 md:p-8">
                            <div className="flex flex-col items-center text-center mb-5">
                                <h1 className="text-2xl font-bold">{t('signin')}</h1>
                                <p className="text-muted-foreground text-balance">
                                    {t('signin_desc')}
                                </p>
                            </div>
                            <SignInForm />
                        </div>
                        <div className="bg-muted relative hidden md:block">
                            <img
                                src="/placeholder.svg"
                                alt="Image"
                                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
}
export default SignIn;
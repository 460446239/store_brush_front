'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useRouter } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslations } from "use-intl";
import { z } from "zod"
import { toast } from "sonner"
import { post } from "./actions";
import { useSearchParams } from "next/navigation";


const schema = z.object({
    account: z.email(),
    password: z.string()
        .min(6)
        .max(16),
    invite_code: z.string().optional()
});

export const SignUpForm = () => {
    const t = useTranslations();
    const search = useSearchParams();
    const router = useRouter();
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: {
            account: '',
            password: '',
            invite_code: undefined,
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
                   label={t('password')}
                   reqired>
            <Input type="password" placeholder={t('placeholder.input', { field: t('password').toLowerCase() })} />
        </FormField>
        <FormField name="invite_code"
                   label={t('invite_code')}>
            <Input placeholder={t('placeholder.input', { field: t('invite_code').toLowerCase() })} />
        </FormField>
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? <Loader2Icon className="animate-spin" /> : null}
            {t('signup')}
        </Button>
        <div className="mt-4 text-center text-sm">
            {t('already_account')}
            <Link replace href="/signin" className="underline underline-offset-4 ml-2">
                {t('signin')}
            </Link>
        </div>
    </Form>
}

const SignUp = () => {
    const t = useTranslations();
    return <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Card>
            <CardHeader className="text-center">
                
                <CardTitle className="text-xl"> 
                    <div className="flex items-center">
                        <Link href="/"><ChevronLeft /></Link>
                        { t('signup_desc') }
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <SignUpForm />
            </CardContent>
        </Card>
      </div>
    </div>
}
export default SignUp;
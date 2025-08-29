'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useTranslations } from "use-intl";
import { z } from "zod"

const schema = z.object({
    email: z.email(),
    password: z.string()
        .min(6)
        .max(16),
    confirm_password:  z.string().min(1)
}).refine((data) =>  data.password === data.confirm_password, { path: ['confirm_password'] });

export const ForgotForm = () => {
    const t = useTranslations();
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
            confirm_password: '',
        }
    });

    const onSubmit = async (data: z.infer<typeof schema>) => {
        toast.error('errors.forgot')
    }

    return <Form className="flex flex-col gap-6" form={form} onSubmit={onSubmit}>
        <FormField name="email"
                   label={t('email')}
                   reqired>
            <Input placeholder="xxx@example.com" />
        </FormField>
        <FormField name="password"
                   label={t('password')}
                   reqired>
            <Input type="password" placeholder={t('placeholder.input', { field: t('password').toLowerCase() })} />
        </FormField>
        <FormField name="confirm_password"
                   label={t('confirm_password')}
                   reqired>
            <Input type="password" placeholder={t('placeholder.input', { field: t('confirm_password').toLowerCase() })} />
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

const Forgot = () => {
    const t = useTranslations();
    return <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-xl"> { t('forgot') }</CardTitle>
            </CardHeader>
            <CardContent>
                <ForgotForm />
            </CardContent>
        </Card>
      </div>
    </div>
}
export default Forgot;
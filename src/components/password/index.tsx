'use client'
import { cloneElement, ReactElement, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { z } from "zod"
import { toast } from "sonner";
import http from '@/lib/client'

interface PasswordProps {
    children: ReactElement;
}

const schema = z.object({
    old_pwd: z.string()
        .min(6)
        .max(32),
    pwd: z.string()
        .min(6)
        .max(32)
});

const PasswordChange = (props: PasswordProps) => {
    const [open, setOpen] = useState(false);
    const t = useTranslations('_password');
    const tCommon = useTranslations();

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: {
            old_pwd: '',
            pwd: '',
        }
    });

    const onSubmit = async (data: z.infer<typeof schema>) => {
        try {
            await http.post('/api/user/edit', data);
            toast.success(t('success'));
            setOpen(false);
            form.reset();
        } catch (e: any) {
            toast.error(tCommon('errors.server'));
        }
    };

    const handleOpenChange = (open: boolean) => {
        setOpen(open);
        if (!open) {
            form.reset();
        }
    };

    return (
        <>
            {cloneElement(props.children, {
                onClick: () => setOpen(true)
            } as any)}
            <Dialog open={open} onOpenChange={handleOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">{t('title')}</DialogTitle>
                        <DialogDescription>
                            {t('description')}
                        </DialogDescription>
                    </DialogHeader>

                    <Form className="flex flex-col gap-4" form={form} onSubmit={onSubmit}>
                        <FormField
                            name="old_pwd"
                            label={t('old_password')}
                            reqired
                        >
                            <Input
                                type="password"
                                placeholder={t('old_password_placeholder')}
                            />
                        </FormField>

                        <FormField
                            name="pwd"
                            label={t('new_password')}
                            reqired
                        >
                            <Input
                                type="password"
                                placeholder={t('new_password_placeholder')}
                            />
                        </FormField>

                        <Button
                            type="submit"
                            className="w-full mt-2"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting ? (
                                <Loader2Icon className="animate-spin mr-2" />
                            ) : null}
                            {t('submit')}
                        </Button>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default PasswordChange;
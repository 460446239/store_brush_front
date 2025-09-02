'use client'
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "use-intl";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { SignInForm } from '@/app/[locale]/signin';

const Page = () => {
    const t = useTranslations();
    const router = useRouter();
     const search = useSearchParams();

    const onSuccess = () => {
        const redirect = search.get('redirect');
        if (redirect) {
            router.back();
            router.replace(redirect);
        } else {
            router.back();
        }
    }

    return  <Dialog open onOpenChange={(open) => open ? null : router.back() }>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{ t('signin') }</DialogTitle>
                        <DialogDescription>{ t('signin_desc') }</DialogDescription>
                    </DialogHeader>
                     <SignInForm onSuccess={onSuccess} />
                </DialogContent>
            </Dialog>
}

export default Page;
'use client'
import { useRouter } from "next/navigation";
import { useTranslations } from "use-intl";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { SignInForm } from '@/app/[locale]/signin';

const Page = () => {
    const t = useTranslations();
    const router = useRouter();

    return  <Dialog open onOpenChange={(open) => open ? null : router.back() }>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{ t('signin') }</DialogTitle>
                        <DialogDescription>{ t('signin_desc') }</DialogDescription>
                    </DialogHeader>
                     <SignInForm />
                </DialogContent>
            </Dialog>
}

export default Page;
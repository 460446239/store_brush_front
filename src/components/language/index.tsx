'use client'
import { useState } from "react";
import { Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const Languages = [
    { key: 'en-us', label: 'English' },
    { key: 'zh-cn', label: '简体中文' },
];

const Language = () => {
    const t = useTranslations();
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const locale = useLocale();

    return <div>
                <Globe className="cursor-pointer hover:text-primary" onClick={() => setOpen(true)} />
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{ t('language') }</DialogTitle>
                            <DialogDescription>{ t('language_desc') }</DialogDescription>
                        </DialogHeader>
                        <ScrollArea className="h-[60vh]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {
                                    Languages.map((language) => {
                                        return <Link href={pathname} locale={language.key} key={language.key} className={cn("cursor-pointer hover:text-primary", { 'text-primary': locale === language.key })}>
                                                { language.label }
                                                </Link>
                                    })
                                }
                            </div>
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
            </div>
}

export default Language;